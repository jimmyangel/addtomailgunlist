# addToMailgunList

This Google Cloud Function is used to add new members to an arbitrary mailgun mailing list, depending on runtime configuration parameters.

## Configuration parameters
`gcloud beta runtime-config configs create hm-mailinglistparms`

### Mailing List
`gcloud beta runtime-config configs variables set mailinglist "maymailinglist@mydomain.com" --config-name hm-mailinglistparms`

### Mailgun API Key
`gcloud beta runtime-config configs variables set mailgun-api-key "key-XXXXXXXXXXXXXXXXXXXXXXX" --config-name hm-mailinglistparms`

### Mailgun Domain
`gcloud beta runtime-config configs variables set mailgun-domain "mydomain.com" --config-name hm-mailinglistparms`

### Email to send notifications
`gcloud beta runtime-config configs variables set notification-email "myemail@mydomain.com" --config-name hm-mailinglistparms`

## Deploy
`gcloud functions deploy addToMailgunList --trigger-http`
