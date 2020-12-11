define({ "api": [
  {
    "type": "post",
    "url": "/customer",
    "title": "Creates new customer",
    "version": "1.0.0",
    "name": "newCustomer",
    "group": "Customer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authentication",
            "description": "<p>authentication token of the session. (Can be supplied via cookie too.)</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "size": "0...",
            "optional": false,
            "field": "CustomerID",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "SosialSecurityNumber",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "FirstName",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "LastName",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"CustomerID\": 0,\n    \"CustomerCountry\": \"Finland\",\n    \"SocialSecurityNumber\": \"484878-1469\",\n    \"Email\": \"test@test.com\",\n    \"FirstName\": \"Testy\",\n    \"LastName\": \"Testington\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/mainbackend/endpoints/customer/customer.go",
    "groupTitle": "Customer"
  },
  {
    "type": "get",
    "url": "/customer",
    "title": "Searches for customer using Email or CustomerID",
    "version": "1.0.0",
    "name": "searchCustomer",
    "group": "Customer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authentication",
            "description": "<p>authentication token of the session. (Can be supplied via cookie too.)</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "Email",
            "description": "<p>email of the customer</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "CustomerID",
            "description": "<p>ID of the customer</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n      \"CustomerId\": 100,\n      \"InspectionID\":41,\n      \"Email\": \"example@mail.com\",\n\t     \"SocialSecurityNumber\": \"051255-153T\",\n      \"FirstName\": \"John\",\n\t     \"LastName\": \"Doe\"\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "src/mainbackend/endpoints/customer/customer.go",
    "groupTitle": "Customer"
  },
  {
    "type": "get",
    "url": "/image",
    "title": "Receives image using ImageID",
    "version": "1.0.0",
    "name": "getImage",
    "group": "Image",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authentication",
            "description": "<p>authentication token of the session. (Can be supplied via cookie too.)</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "ImageID",
            "description": "<p>ID of the image that should be received URL encoded</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Access",
            "description": "<p>level is not sufficient</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ImageID",
            "description": "<p>was not supplied</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Image",
            "description": "<p>couldn't be loaded with the image id</p>"
          }
        ]
      }
    },
    "filename": "src/syncbackend/handlers/image.go",
    "groupTitle": "Image"
  },
  {
    "type": "post",
    "url": "/image",
    "title": "Uploads new image and returns ImageID",
    "version": "1.0.0",
    "name": "newImage",
    "group": "Image",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authentication",
            "description": "<p>authentication token of the session. (Can be supplied via cookie too.)</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Binary",
            "optional": false,
            "field": "Fileupload",
            "description": "<p>Image data that should be stored</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"ImageID\": \"75156\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "New",
            "description": "<p>data can be uploaded only to the central node</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Access",
            "description": "<p>level is not sufficient</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "File",
            "description": "<p>could not be received</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Could",
            "description": "<p>not save file to disk</p>"
          }
        ]
      }
    },
    "filename": "src/syncbackend/handlers/image.go",
    "groupTitle": "Image"
  },
  {
    "type": "post",
    "url": "/inspection/decision",
    "title": "approve or reject inspection images",
    "version": "1.0.0",
    "name": "decision",
    "group": "Inspection",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authentication",
            "description": "<p>authentication token of the session. (Can be supplied via cookie too.)</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "InspectionID",
            "description": "<p>inspecion id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "allowedValues": [
              "0",
              "1"
            ],
            "optional": false,
            "field": "Approval",
            "description": "<p>approval value, 0 for reject and 1 for approve.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  results: \"Decision ok\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/mainbackend/endpoints/inspection/inspection.go",
    "groupTitle": "Inspection"
  },
  {
    "type": "get",
    "url": "/inspection",
    "title": "Get inspection info from specific inspection",
    "version": "1.0.0",
    "name": "getInspection",
    "group": "Inspection",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authentication",
            "description": "<p>authentication token of the session. (Can be supplied via cookie too.)</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "size": "0..",
            "optional": false,
            "field": "InspectionID",
            "description": "<p>selected inspection's ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n     \"CustomerId\":81,\n    \t\"FundusPhotoRef\":52353534\n\t\t\"OctScanRef\":32323434\n\t\t\"VisualFieldRef\":22243334\n\t\t\"Timestamp\": \"12.11.2011 10:22:01\"\n\t\t\"LoginToken\": \"XY2Z-2324-S422-0324\"\n\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "src/mainbackend/endpoints/inspection/inspection.go",
    "groupTitle": "Inspection"
  },
  {
    "type": "post",
    "url": "/inspection",
    "title": "Creates new inspection",
    "version": "1.0.0",
    "name": "newInspection",
    "group": "Inspection",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authentication",
            "description": "<p>authentication token of the session. (Can be supplied via cookie too.)</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "size": "0..",
            "optional": false,
            "field": "CustomerID",
            "description": "<p>ID of the customer</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "TimeStamp",
            "description": "<p>Timestamp of the inspection</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "60",
            "optional": false,
            "field": "FundusPhotoRef",
            "description": "<p>fundus Image ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "60",
            "optional": false,
            "field": "OctScanRef",
            "description": "<p>oct Image ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "60",
            "optional": false,
            "field": "VisualVieldRef",
            "description": "<p>visual Image ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "LoginToken",
            "description": "<p>Token for customer login</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  results: \"New inspection created\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/mainbackend/endpoints/inspection/inspection.go",
    "groupTitle": "Inspection"
  },
  {
    "type": "get",
    "url": "/ophtalmologist/inspections",
    "title": "Get own cases",
    "version": "1.0.0",
    "name": "getOphtalmologistCases",
    "group": "Ophtalmologis",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authentication",
            "description": "<p>authentication token of the session. (Can be supplied via cookie too.)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n  \t\"inspections\":[\n     \t{\n        \t    \"CustomerId\":11,\n\t\t        \"InspectionId\":24,\n\t\t        \"Timestamp\":\"12.11.2020 11:12:31\"\n        \t    \"SocialSecurityNumber\":\"141195-511Y\",\n        \t    \"FirstName\":\"Osku\",\n        \t    \"LastName\":\"Väänänen\"\n     \t},\n     \t{\n       \t    \"CustomerId\":45,\n\t\t        \"InspectionId\":266,\n\t\t        \"Timestamp\":\"12.11.2020 11:12:31\"\n        \t    \"SocialSecurityNumber\":\"120194-514H\",\n       \t    \"FirstName\":\"Kaisa\",\n       \t    \"LastName\":\"Kunnari\"\n     \t}]\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "src/mainbackend/endpoints/opthalmologist/inspection.go",
    "groupTitle": "Ophtalmologis"
  },
  {
    "type": "get",
    "url": "/customers/inspections",
    "title": "Get customer inspections based on customerID",
    "version": "1.0.0",
    "name": "getInspectionImages",
    "group": "Optician",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authentication",
            "description": "<p>authentication token of the session. (Can be supplied via cookie too.)</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "CustomerID",
            "description": "<p>customers ID (can be supplied automatically from token if customer)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n     inspections: [\n\t{\n\t\t\"InspectionID\":23,\n        \t\"Timestamp\": \"13.12.2010 09:22:01\"\n    \t},\n\t{\n\t\t\"InspectionID\":27,\n        \t\"Timestamp\": \"15.11.2011 10:22:01\"\n    \t},",
          "type": "json"
        }
      ]
    },
    "filename": "src/mainbackend/endpoints/customer/customer.go",
    "groupTitle": "Optician"
  },
  {
    "type": "get",
    "url": "/optician/customers",
    "title": "Get optician customers",
    "version": "1.0.0",
    "name": "getOptician_customers",
    "group": "Optician",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authentication",
            "description": "<p>authentication token of the session. (Can be supplied via cookie too.)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  \tHTTP/1.1 200 OK\n \t{\n\t\"customers\":[\n   \t{\n      \t\"customerId\":81,\n      \t\"socialSecurityNumber\":\"141195-511Y\",\n      \t\"firstName\":\"Osku\",\n      \t\"lastName\":\"Väänänen\"\n   \t},\n   \t{\n     \t \"customerId\":85,\n      \t\"socialSecurityNumber\":\"120194-514H\",\n     \t \"firstName\":\"Kaisa\",\n     \t \"lastName\":\"Kunnari\"\n   \t}]\n  \t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnknownError",
            "description": "<p>Unknown error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>You don't have access to this customer data</p>"
          }
        ]
      }
    },
    "filename": "src/mainbackend/endpoints/optician/optician.go",
    "groupTitle": "Optician"
  },
  {
    "type": "post",
    "url": "/authentication/customer",
    "title": "Customer authenticates with token",
    "version": "1.0.0",
    "name": "authenticateCustomer",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Token",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"Authentication\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUeXBlIjoiQ3VzdG9tZXIiLCJJRCI6MCwiRW1haWwiOiJ1c2VyQG1haWwuY29tIiwiQ291bnRyeSI6IkZpbmxhbmQiLCJGaXJzdE5hbWUiOiJGaXJzdCIsIkxhc3ROYW1lIjoiTGFzdCIsIkFjY2Vzc0xldmVsIjoibm9ybWFsIn0.QW2gPnygQngIQ29M1zRI6iyNAQAomgIhFfYfodwHkwU\",\n    \"Type\": \"Customer\",\n    \"Person\": {\n        \"CustomerID\": 0,\n        \"CustomerCountry\": \"Finland\",\n        \"Email\": \"user@mail.com\",\n        \"FirstName\": \"First\",\n        \"LastName\": \"Last\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TokenIncorrect",
            "description": "<p>Token was incorrect</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnknownError",
            "description": "<p>Unknown error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Bad request\n{\n  error: \"Token is incorrect\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/gateway/handlers/login.go",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/authentication/employee",
    "title": "Authenticates with email address and password",
    "version": "1.0.0",
    "name": "authenticateUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "5..100",
            "optional": false,
            "field": "Email",
            "description": "<p>User email address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "4..72",
            "optional": false,
            "field": "Password",
            "description": "<p>User personal password.</p>"
          }
        ]
      }
    },
    "header": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"Authentication\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUeXBlIjoiT3B0aWNpYW4iLCJJRCI6MCwiRW1haWwiOiJvcHRpY2lhbkBtYWlsLmNvbSIsIkNvdW50cnkiOiJGaW5sYW5kIiwiRmlyc3ROYW1lIjoiRmlyc3QiLCJMYXN0TmFtZSI6Ikxhc3QiLCJBY2Nlc3NMZXZlbCI6Ik5vcm1hbCJ9.ygChtosY43j4rJWXQXSR08a2VL8giwIBgMH7ZFQPikY\",\n    \"Type\": \"Optician\",\n    \"Person\": {\n        \"EmployeeID\": 0,\n        \"OpticianID\": 0,\n        \"OpticianCountry\": \"Finland\",\n        \"OpticianEmployeeCountry\": \"Finland\",\n        \"Email\": \"optician@mail.com\",\n        \"FirstName\": \"First\",\n        \"LastName\": \"Last\",\n        \"AccessLevel\": \"Normal\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "EmailIncorrect",
            "description": "<p>Unknown email address</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PasswordIncorrect",
            "description": "<p>Password was incorrect</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnknownError",
            "description": "<p>Unknown error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad request\n{\n  error: \"Password is incorrect\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/gateway/handlers/login.go",
    "groupTitle": "User"
  }
] });
