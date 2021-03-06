import gql from 'graphql-tag';

export const GET_PENDING_REQUEST_CLIENT = gql`
  query getPendingRequests(
    $client: Int
    $triko: Int
    $locale: String = "en"
    $type: Int = 1
    $workflow: String
  ) {
    response: servicesrequests(
      client_id: $client
      triko_id: $triko
      locale: $locale
      service_request_type_id: $type
      workflow_transition_id: $workflow
    ) {
      id
      address
      duration
      application_date
      attributes
      history {
        id
        transition
        workflow: workflowtransition {
          name: workflow
        }
        date: created_at
        created_at
      }
      type: servicerequesttype {
        id
        name
      }
      order {
        id
        order_code
        payment_method_id
        method: paymentmethod {
          name
          icon
          attrs {
            type
          }
        }
        subtotal
        taxtotal
        total
        details {
          concept {
            name
          }
          total
        }
        transition: workflowtransition {
          workflow
        }
      }
      details: servicesrequestsdetails {
        id
        products {
          image {
            url_download_file
          }
          measure: measureunit {
            id
            name
            shortName: shortname
          }
          quantity: qty
          product {
            id
            name
            categories {
              category {
                id
                name
              }
            }
          }
        }
        service {
          id
          name
          icon
          attrs
          type: servicetype {
            id
            name
            icon
            attrs
          }
        }
      }
      attrs {
        by_hour
        longitude
        latitude
        chat_id
        tip
        transport
        payment_method
      }
      transition: workflowtransition {
        workflow
      }

      triko {
        id
        rating
        pi: personalinformation {
          id
          id_number
          first_name
          last_name
          birth_date
          city {
            id
            name
          }
          idtype {
            id
            name
          }
          gender {
            id
            name
          }
          civilstatus {
            id
            name
          }
        }
        user {
          id
          photo_url
          phonenumber
          attrs
          country {
            id
            name
            code: iso2
          }
        }
      }
    }
  }
`;

export const GET_PENDING_REQUEST_TRIKO = gql`
  query getPendingRequests(
    $client: Int
    $rejected: Boolean
    $triko: Int
    $nearest: String
    $locale: String = "en"
    $onlyOwned: Boolean
    $type: Int = 1
    $date: String
    $workflow: String
    $onlyAvailable: Boolean
  ) {
    response: servicesrequests(
      client_id: $client
      triko_id: $triko
      includeRejected: $rejected
      onlyOwned: $onlyOwned
      application_date: $date
      getAvailablesServices: $onlyAvailable
      closeToMe: $nearest
      service_request_type_id: $type
      locale: $locale
      workflow_transition_id: $workflow
    ) {
      id
      address
      duration
      application_date
      attributes
      history {
        id
        transitionStep: transition
        workflow: workflowtransition {
          name: workflow
        }
        transition: workflowtransition {
          workflow
        }
        date: created_at
        created_at
        user: user_id
      }
      type: servicerequesttype {
        id
        name
      }
      order {
        id
        order_code
        payment_method_id
        method: paymentmethod {
          name
          icon
          attrs {
            type
          }
        }
        subtotal
        taxtotal
        total
        details {
          concept {
            name
          }
          total
        }
        transition: workflowtransition {
          workflow
        }
      }
      details: servicesrequestsdetails {
        id
        products {
          description
          image {
            url_download_file
          }
          measure: measureunit {
            id
            name
            shortName: shortname
          }
          quantity: qty
          product {
            id
            name
            attrs
            categories {
              category {
                id
                name
              }
            }
          }
        }
        service {
          id
          name
          icon
          type: servicetype {
            id
            name
            icon
          }
        }
      }
      attrs {
        by_hour
        longitude
        latitude
        chat_id
        tip
        transport
        payment_method
      }
      transition: workflowtransition {
        workflow
      }
      triko {
        id
      }
      client {
        id
        pi: personalinformation {
          id
          id_number
          first_name
          last_name
          birth_date
          city {
            id
            name
          }
          idtype {
            id
            name
          }
          gender {
            id
            name
          }
          civilstatus {
            id
            name
          }
        }
        user {
          id
          photo_url
          phonenumber
          attrs
          country {
            id
            name
            code: iso2
          }
        }
      }
    }
  }
`;
