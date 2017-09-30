import test from 'tape';
import tapSpec from 'tap-spec';
import requestPromise from 'request-promise';
import retryPromise from 'retry-promise';

test.createStream()
    .pipe(tapSpec())
    .pipe(process.stdout);

const before = test;
const after = test;

const createdAt = Date.now();

let connection;
let userId;
const refreshToken = '1234';
const repo_host = 'fcrepo';
const repo_port = 8080;
const fuseki_host = 'fuseki';
const fuseki_port = 3030;
const djatoka_host = 'djatoka';
const djatoka_port = 8888;
const testGraph = 'manifests';
const testObj = 'test-1';

before('BEFORE', (t) => {
    const RepositoryCheck = (attempt) => {
        if (attempt > 1) {
            t.comment('Repository check failed retrying...');
        }
        return requestPromise({
            method: 'GET',
            uri: `http://${repo_host}:${repo_port}/fcrepo/rest`,
            headers: {
                'Accept': 'application/ld+json'
            },
            json: true,
            resolveWithFullResponse: true,
        })
            .then((response) => {
                if (response.statusCode !== 200) {
                    throw new Error('Repository Check Failed');
                }
            })
    };
    const FusekiCheck = (attempt) => {
        if (attempt > 1) {
            t.comment('Fuseki check failed retrying...');
        }
        return requestPromise({
            method: 'GET',
            uri: `http://${fuseki_host}:${fuseki_port}/fuseki/${testGraph}/get`,
            resolveWithFullResponse: true,
        })
            .then((response) => {
                if (response.statusCode !== 200) {
                    throw new Error('Fuseki Check Failed');
                }
            })
    };
    const DjatokaCheck = (attempt) => {
        if (attempt > 1) {
            t.comment('Djatoka check failed retrying...');
        }
        return requestPromise({
            method: 'GET',
            uri: `http://${djatoka_host}:${djatoka_port}`,
            resolveWithFullResponse: true,
        })
            .then((response) => {
                if (response.statusCode !== 200) {
                    throw new Error('Djatoka Check Failed');
                }
            })
    };
    return retryPromise({max: 5, backoff: 10000}, FusekiCheck, DjatokaCheck, RepositoryCheck)
        .then(() => {
            t.pass('Health Checks Passed');
            t.end();
        })
        .catch((error) => t.fail(error));
});

test('PUT INTO REPOSITORY', (t) => {
    const putRequest = () => {
        return requestPromise({
            method: 'PUT',
            uri: `http://${repo_host}:${repo_port}/fcrepo/rest/${testObj}`,
            resolveWithFullResponse: true
        })
            .then((response) => {
                t.equal(response.statusCode, 201, 'statusCode: 201');
                t.deepEqual(response.body, `http://${repo_host}:${repo_port}/fcrepo/rest/${testObj}`, "body: is equal");
            });
    };
    return retryPromise({max: 2, backoff: 10000}, putRequest)
        .then(() => {
            t.pass('PUT to Repository');
            t.end();
        })
        .catch((error) => t.fail(error));
});
test('GET FROM FUSEKI', (t) => {
    const getFromFuseki = () => {
        return requestPromise({
            method: 'GET',
            uri: `http://${fuseki_host}:${fuseki_port}/fuseki/${testGraph}/data`,
            headers: {
                'Accept': 'application/ld+json'
            },
            json: true,
            resolveWithFullResponse: true
        })
            .then((response) => {
               // t.equal(response.statusCode, 200, 'statusCode: 200');
                const expected = `http://${repo_host}:${repo_port}/fcrepo/rest/${testObj}`;
                t.objContains(response, expected, "body: contains test object");
            });
    };
    return retryPromise({max: 5, backoff: 40000}, getFromFuseki)
        .then(() => {
            t.pass('GET from Fuseki');
            t.end();
        })
        .catch((error) => t.fail(error));
});

after('AFTER', (t) => {
    t.end();
});

test.Test.prototype.objContains = function (response, expected, message) {
        const actual = response.body['@graph'][1]['@id'];
        this._assert(actual === expected, {
            message: message,
            operator: 'objContains',
            actual: actual,
            expected: expected
        });
};