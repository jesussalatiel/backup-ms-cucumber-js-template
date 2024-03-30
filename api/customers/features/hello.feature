Feature: POST /customers

  Background: Delete Customer
    Given there are no existing customers
      | mobile               | document_type | document_number      |
      | local:default:random | DNI           | local:default:random |


  @Working
  Scenario: Should no be able to create a customer on Dynamo identity document not exists
    When I request to create customer on Dynamo
      | name | lastName | motherLastName | document_type | document_number      | mobile               | email                |
      | Not  | Found    | Error          | DNI           | local:default:random | local:default:random | local:default:random |
    Then API response status code should be 200
    Then I request to find a customer using the following params:
      | document_type | document_number      |
      | DNI           | local:default:random |
    Then I have the following Joi schema:
      | schemaName     |
      | customerSchema |
