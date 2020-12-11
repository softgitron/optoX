##### Authentication tests

Test customer login: `curl optox.net/api/authentication/customer -d '{"token": "1234567890123456"}'`
Test admin login: `curl optox.net/api/authentication/employee -d '{"email": "admin", "password": "admin"}'`
Test optician login: `curl optox.net/api/authentication/employee -d '{"email": "optician@mail.com", "password": "optician"}'`
Test opthalmologist login: `curl optox.net/api/authentication/employee -d '{"email": "opthalmologist@mail.com", "password": "opthalmologist"}'`

##### Get optician customers tests

Try to receive optician customers: `curl optox.net/api/optician/customers -H 'Authentication: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUeXBlIjoiT3B0aWNpYW4iLCJJRCI6MCwiRW1wbG95ZXJJRCI6MCwiRW1haWwiOiJvcHRpY2lhbkBtYWlsLmNvbSIsIkNvdW50cnkiOiJGaW5sYW5kIiwiRmlyc3ROYW1lIjoiRmlyc3QiLCJMYXN0TmFtZSI6Ikxhc3QiLCJBY2Nlc3NMZXZlbCI6Ik5vcm1hbCJ9.j_b1DqMPS7Fh2NKcgirid_u5T6HM3sJ4btkXlivOd2Y'`

##### Opthalmologist approve or reject

Set inspection status to approved: `curl optox.net/api/inspection/decision -H 'Authentication: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUeXBlIjoiT3B0aGFsbW9sb2dpc3QiLCJJRCI6MCwiRW1wbG95ZXJJRCI6MCwiRW1haWwiOiJvcHRoYWxtb2xvZ2lzdEBtYWlsLmNvbSIsIkNvdW50cnkiOiJGaW5sYW5kIiwiRmlyc3ROYW1lIjoiRmlyc3QiLCJMYXN0TmFtZSI6Ikxhc3QiLCJBY2Nlc3NMZXZlbCI6Ik5vcm1hbCJ9.KvEkZhwiveVPY3QcPBGEv_3TWJ9uv94m77M9oj8-LDA' -d '{"InspectionID": 0, "Approval": 1}'`

##### Opthalmologist get inspections

Get opthalmologist inspections: `curl optox.net/api/opthalmologist/inspections -H 'Authentication: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUeXBlIjoiT3B0aGFsbW9sb2dpc3QiLCJJRCI6MCwiRW1wbG95ZXJJRCI6MCwiRW1haWwiOiJvcHRoYWxtb2xvZ2lzdEBtYWlsLmNvbSIsIkNvdW50cnkiOiJGaW5sYW5kIiwiRmlyc3ROYW1lIjoiRmlyc3QiLCJMYXN0TmFtZSI6Ikxhc3QiLCJBY2Nlc3NMZXZlbCI6Ik5vcm1hbCJ9.KvEkZhwiveVPY3QcPBGEv_3TWJ9uv94m77M9oj8-LDA'`

##### Image tests

Upload image: `curl optox.net/api/image -H 'Authentication: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUeXBlIjoiT3B0aWNpYW4iLCJJRCI6MCwiRW1wbG95ZXJJRCI6MCwiRW1haWwiOiJvcHRpY2lhbkBtYWlsLmNvbSIsIkNvdW50cnkiOiJGaW5sYW5kIiwiRmlyc3ROYW1lIjoiRmlyc3QiLCJMYXN0TmFtZSI6Ikxhc3QiLCJBY2Nlc3NMZXZlbCI6Ik5vcm1hbCJ9.j_b1DqMPS7Fh2NKcgirid_u5T6HM3sJ4btkXlivOd2Y' -F 'Fileupload=@docs/test.jpg'`
Download image: `curl 'optox.net/api/image?ImageID=1298498081' -H 'Authentication: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUeXBlIjoiT3B0aWNpYW4iLCJJRCI6MCwiRW1wbG95ZXJJRCI6MCwiRW1haWwiOiJvcHRpY2lhbkBtYWlsLmNvbSIsIkNvdW50cnkiOiJGaW5sYW5kIiwiRmlyc3ROYW1lIjoiRmlyc3QiLCJMYXN0TmFtZSI6Ikxhc3QiLCJBY2Nlc3NMZXZlbCI6Ik5vcm1hbCJ9.j_b1DqMPS7Fh2NKcgirid_u5T6HM3sJ4btkXlivOd2Y' --output temp.jpg`
Upload image to remote location: `curl optox.fi/api/image -H 'Authentication: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUeXBlIjoiT3B0aWNpYW4iLCJJRCI6MCwiRW1wbG95ZXJJRCI6MCwiRW1haWwiOiJvcHRpY2lhbkBtYWlsLmNvbSIsIkNvdW50cnkiOiJGaW5sYW5kIiwiRmlyc3ROYW1lIjoiRmlyc3QiLCJMYXN0TmFtZSI6Ikxhc3QiLCJBY2Nlc3NMZXZlbCI6Ik5vcm1hbCJ9.j_b1DqMPS7Fh2NKcgirid_u5T6HM3sJ4btkXlivOd2Y' -F 'Fileupload=@docs/test.jpg'`
Download image from remote location: `curl 'optox.fi/api/image?ImageID=1298498081' -H 'Authentication: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUeXBlIjoiT3B0aWNpYW4iLCJJRCI6MCwiRW1wbG95ZXJJRCI6MCwiRW1haWwiOiJvcHRpY2lhbkBtYWlsLmNvbSIsIkNvdW50cnkiOiJGaW5sYW5kIiwiRmlyc3ROYW1lIjoiRmlyc3QiLCJMYXN0TmFtZSI6Ikxhc3QiLCJBY2Nlc3NMZXZlbCI6Ik5vcm1hbCJ9.j_b1DqMPS7Fh2NKcgirid_u5T6HM3sJ4btkXlivOd2Y' --output temp.jpg`

##### Customer tests

Add customer `curl optox.net/api/customer -H 'Authentication: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUeXBlIjoiT3B0aWNpYW4iLCJJRCI6MCwiRW1wbG95ZXJJRCI6MCwiRW1haWwiOiJvcHRpY2lhbkBtYWlsLmNvbSIsIkNvdW50cnkiOiJGaW5sYW5kIiwiRmlyc3ROYW1lIjoiRmlyc3QiLCJMYXN0TmFtZSI6Ikxhc3QiLCJBY2Nlc3NMZXZlbCI6Ik5vcm1hbCJ9.j_b1DqMPS7Fh2NKcgirid_u5T6HM3sJ4btkXlivOd2Y' -d '{"CustomerCountry": "Finland", "SocialSecurityNumber": "484878-1469", "Email": "test@test.com", "FirstName": "Testy", "LastName": "Testington"}'`

Get customer usign ID `curl 'optox.net/api/customer?CustomerID=0' -H 'Authentication: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUeXBlIjoiT3B0aWNpYW4iLCJJRCI6MCwiRW1wbG95ZXJJRCI6MCwiRW1haWwiOiJvcHRpY2lhbkBtYWlsLmNvbSIsIkNvdW50cnkiOiJGaW5sYW5kIiwiRmlyc3ROYW1lIjoiRmlyc3QiLCJMYXN0TmFtZSI6Ikxhc3QiLCJBY2Nlc3NMZXZlbCI6Ik5vcm1hbCJ9.j_b1DqMPS7Fh2NKcgirid_u5T6HM3sJ4btkXlivOd2Y'`

Get customer usign Email `curl 'optox.net/api/customer?Email=user@mail.com' -H 'Authentication: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUeXBlIjoiT3B0aWNpYW4iLCJJRCI6MCwiRW1wbG95ZXJJRCI6MCwiRW1haWwiOiJvcHRpY2lhbkBtYWlsLmNvbSIsIkNvdW50cnkiOiJGaW5sYW5kIiwiRmlyc3ROYW1lIjoiRmlyc3QiLCJMYXN0TmFtZSI6Ikxhc3QiLCJBY2Nlc3NMZXZlbCI6Ik5vcm1hbCJ9.j_b1DqMPS7Fh2NKcgirid_u5T6HM3sJ4btkXlivOd2Y'`

Try getting customer inspections using customer token `curl 'optox.net/api/customer/inspections' -H 'Authentication: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUeXBlIjoiQ3VzdG9tZXIiLCJJRCI6MCwiRW1wbG95ZXJJRCI6MCwiRW1haWwiOiJ1c2VyQG1haWwuY29tIiwiQ291bnRyeSI6IkZpbmxhbmQiLCJGaXJzdE5hbWUiOiJGaXJzdCIsIkxhc3ROYW1lIjoiTGFzdCIsIkFjY2Vzc0xldmVsIjoiTm9ybWFsIn0.uzGfPeCs4bea1u_Q2SmaCfQtZcxsU1DUukvsaaXK8K8'`

Try getting customer inspections using optician token `curl 'optox.net/api/customer/inspections?CustomerID=0' -H 'Authentication: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUeXBlIjoiT3B0aWNpYW4iLCJJRCI6MCwiRW1wbG95ZXJJRCI6MCwiRW1haWwiOiJvcHRpY2lhbkBtYWlsLmNvbSIsIkNvdW50cnkiOiJGaW5sYW5kIiwiRmlyc3ROYW1lIjoiRmlyc3QiLCJMYXN0TmFtZSI6Ikxhc3QiLCJBY2Nlc3NMZXZlbCI6Ik5vcm1hbCJ9.j_b1DqMPS7Fh2NKcgirid_u5T6HM3sJ4btkXlivOd2Y'`

##### Inspection tests

Try to get inspection info from inspection `curl 'optox.net/api/inspection?InspectionID=0' -H 'Authentication: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUeXBlIjoiT3B0aWNpYW4iLCJJRCI6MCwiRW1wbG95ZXJJRCI6MCwiRW1haWwiOiJvcHRpY2lhbkBtYWlsLmNvbSIsIkNvdW50cnkiOiJGaW5sYW5kIiwiRmlyc3ROYW1lIjoiRmlyc3QiLCJMYXN0TmFtZSI6Ikxhc3QiLCJBY2Nlc3NMZXZlbCI6Ik5vcm1hbCJ9.j_b1DqMPS7Fh2NKcgirid_u5T6HM3sJ4btkXlivOd2Y'`

Try to get inspection info using customer token `curl 'optox.net/api/inspection?InspectionID=0' -H 'Authentication: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUeXBlIjoiQ3VzdG9tZXIiLCJJRCI6MCwiRW1wbG95ZXJJRCI6MCwiRW1haWwiOiJ1c2VyQG1haWwuY29tIiwiQ291bnRyeSI6IkZpbmxhbmQiLCJGaXJzdE5hbWUiOiJGaXJzdCIsIkxhc3ROYW1lIjoiTGFzdCIsIkFjY2Vzc0xldmVsIjoiTm9ybWFsIn0.uzGfPeCs4bea1u_Q2SmaCfQtZcxsU1DUukvsaaXK8K8'`

Add inspection `curl optox.net/api/inspection -H 'Authentication: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUeXBlIjoiT3B0aWNpYW4iLCJJRCI6MCwiRW1wbG95ZXJJRCI6MCwiRW1haWwiOiJvcHRpY2lhbkBtYWlsLmNvbSIsIkNvdW50cnkiOiJGaW5sYW5kIiwiRmlyc3ROYW1lIjoiRmlyc3QiLCJMYXN0TmFtZSI6Ikxhc3QiLCJBY2Nlc3NMZXZlbCI6Ik5vcm1hbCJ9.j_b1DqMPS7Fh2NKcgirid_u5T6HM3sJ4btkXlivOd2Y' -d '{"CustomerID": 0, "InspectionCountry": "Finland", "FundusPhotoRef": 0, "OctScanRef": 0, "VisualFieldRef": 0, "TimeStamp": "2002-10-02T15:00:00Z", "LoginToken": "1234567890123456"}'`

##### All opthalmologists

Get all opthalmologists `curl optox.net/api/opthalmologist -H 'Authentication: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUeXBlIjoiT3B0aWNpYW4iLCJJRCI6MCwiRW1wbG95ZXJJRCI6MCwiRW1haWwiOiJvcHRpY2lhbkBtYWlsLmNvbSIsIkNvdW50cnkiOiJGaW5sYW5kIiwiRmlyc3ROYW1lIjoiRmlyc3QiLCJMYXN0TmFtZSI6Ikxhc3QiLCJBY2Nlc3NMZXZlbCI6Ik5vcm1hbCJ9.j_b1DqMPS7Fh2NKcgirid_u5T6HM3sJ4btkXlivOd2Y'`
