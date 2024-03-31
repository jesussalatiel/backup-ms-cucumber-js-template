Feature: POST /customers

  Background: Delete Customer
    Given I remove a customer with the following params:
      | mobile               | document_type | document_number      |
      | local:default:random | DNI           | local:default:random |

  @Working
  Scenario: Should no be able to create a customer on Dynamo identity document not exists
    When I request to create customer on Dynamo
      | name | last_name | mother_last_name | document_type | document_number      | mobile               | email                | status  | status_code |
      | Not  | Found     | Error            | DNI           | local:default:random | local:default:random | local:default:random | INVITED | 200         |
    And I request to find a customer using the following params:
      | document_type | document_number      |
      | DNI           | local:default:random |
    Then I initiate the JOI validation searching for the schema:
      | schema_name    |
      | customerSchema |
    And API response header "IHF-Correlation-Id" should be a valid UUID
    And API response header "Access-Control-Allow-Headers" should contain the following values:
      | Content_Type         |
      | X-Amz-Date           |
      | Authorization        |
      | X-Api-Key            |
      | X-Amz-Security-Token |
      | X-Amz-User-Agent     |
      | IHF-Security-Code    |


