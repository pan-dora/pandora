###Load Balancer Config Apache


```
<VirtualHost *:80>
      ServerName loris
      Protocols h2 h2c http/1.1
      ProxyRequests off
      ProxyPreserveHost on
      ProxyPass / "balancer://lorisset/"
      ProxyPassReverse / "balancer://lorisset/"
     <Proxy balancer://lorisset>
         BalancerMember http://localhost:5004
         BalancerMember http://localhost:5005 loadfactor=3 timeout=3
         ProxySet lbmethod=bytraffic
         Order allow,deny
         allow from all
     </Proxy>
</VirtualHost>