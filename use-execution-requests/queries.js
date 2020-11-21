import gql from 'graphql-tag';

export const GET_EXECUTION_REQUESTS = gql`
  query getPendingRequests(
    $id: Int
    $client: Int
    $triko: Int
    $locale: String = "en"
    $workflow: Int
  ) {
    response: servicesrequests(
      id: $id
      client_id: $client
      triko_id: $triko
      locale: $locale
      workflow_transition_id: $workflow
    ) {
      id
      address
      duration
      attributes
      type: servicerequesttype {
        id
        name
      }
      application_date
      chat {
        id
        messages: chatsmessages {
          id
          sender {
            id
          }
        }
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
      history {
        id
        transition: workflowtransition {
          workflow
        }
        transitionStep: transition
        created_at
        user: user_id
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
      details: servicesrequestsdetails {
        id
        price
        products {
          id
          attrs
          image {
            url_download_file
          }
          measure: measureunit {
            id
            name
            shortName: shortname
          }
          quantity: qty
          price
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
        }
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
        }
      }
    }
  }
`;
