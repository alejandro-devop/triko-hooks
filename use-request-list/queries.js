import gql from 'graphql-tag';

export const GET_PENDING_REQUEST_CLIENT = gql`
  query getPendingRequests($client: Int, $triko: Int, $locale: String = "en") {
    response: servicesrequests(
      client_id: $client
      triko_id: $triko
      locale: $locale
    ) {
      id
      address
      duration
      application_date
      history {
        id
        transition
        workflow: workflowtransition {
          name: workflow
        }
        date: created_at
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
  query getPendingRequests($client: Int, $triko: Int, $locale: String = "en") {
    response: servicesrequests(
      client_id: $client
      triko_id: $triko
      locale: $locale
    ) {
      id
      address
      duration
      application_date
      history {
        id
        transition
        workflow: workflowtransition {
          name: iworkflow
        }
        date: created_at
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
        service {
          id
          name
          icon
          attrs
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
