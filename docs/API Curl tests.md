##### Authentication tests

Test customer login: `curl optox.net/api/authentication/customer -d '{"token": "1234567890123456"}'`  
Test admin login: `curl optox.net/api/authentication/employee -d '{"email": "admin", "password": "admin"}'`  
Test optician login: `curl optox.net/api/authentication/employee -d '{"email": "optician@mail.com", "password": "optician"}'`  
Test opthalmologist login: `curl optox.net/api/authentication/employee -d '{"email": "opthalmologist@mail.com", "password": "opthalmologist"}'`  
Test API function with authentication: `curl optox.net/api/healtz -H 'Authentication: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUeXBlIjoiQWRtaW5pc3RyYXRvciIsIklEIjoxLCJFbWFpbCI6ImFkbWluIn0.UBUKQvSoEp0SWuTFk0DsW-BX3hKk4ETOI8rFx6RBREM'`  
Test API function with authentication #2: `curl optox.net/api/healtz -H 'Authentication: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUeXBlIjoiQ3VzdG9tZXIiLCJJRCI6MCwiRW1haWwiOiJ1c2VyQG1haWwuY29tIiwiQ291bnRyeSI6IkZpbmxhbmQiLCJGaXJzdE5hbWUiOiJGaXJzdCIsIkxhc3ROYW1lIjoiTGFzdCIsIkFjY2Vzc0xldmVsIjoibm9ybWFsIn0.QW2gPnygQngIQ29M1zRI6iyNAQAomgIhFfYfodwHkwU'`

##### Get optician customers tests

Try to receive optician customers: `curl optox.net/api/optician/customers -H 'Authentication: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUeXBlIjoiT3B0aWNpYW4iLCJJRCI6MCwiRW1haWwiOiJvcHRpY2lhbkBtYWlsLmNvbSIsIkNvdW50cnkiOiJGaW5sYW5kIiwiRmlyc3ROYW1lIjoiRmlyc3QiLCJMYXN0TmFtZSI6Ikxhc3QiLCJBY2Nlc3NMZXZlbCI6Ik5vcm1hbCJ9.ygChtosY43j4rJWXQXSR08a2VL8giwIBgMH7ZFQPikY'`
