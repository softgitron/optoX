##### Authentication tests

Test customer login: `curl optox.net/api/users/login -d '{"token": "1234567890123456"}'`  
Test admin login: `curl optox.net/api/users/login -d '{"email": "admin", "password": "admin"}'`  
Test optician login: `curl optox.net/api/users/login -d '{"email": "optician@mail.com", "password": "optician"}'`  
Test opthalmologist login: `curl optox.net/api/users/login -d '{"email": "opthalmologist@mail.com", "password": "opthalmologist"}'`  
Test API function with authentication: `curl optox.net/api/healtz -H 'Authentication: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUeXBlIjoiQWRtaW5pc3RyYXRvciIsIklEIjoxLCJFbWFpbCI6ImFkbWluIn0.UBUKQvSoEp0SWuTFk0DsW-BX3hKk4ETOI8rFx6RBREM'`  
Test API function with authentication #2: `curl optox.net/api/healtz -H 'Authentication: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUeXBlIjoiQ3VzdG9tZXIiLCJJRCI6MCwiRW1haWwiOiJ1c2VyQG1haWwuY29tIiwiQ291bnRyeSI6IkZpbmxhbmQiLCJGaXJzdE5hbWUiOiJGaXJzdCIsIkxhc3ROYW1lIjoiTGFzdCIsIkFjY2Vzc0xldmVsIjoibm9ybWFsIn0.QW2gPnygQngIQ29M1zRI6iyNAQAomgIhFfYfodwHkwU'`  
