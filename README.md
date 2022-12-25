#Back Engineer Project

## Project - Customer and Card Management

### Key points

# Create Customer POST /customer

-Fields to be send from body are below

```yaml
{
  'firstName': 'Pankaj',
  'lastName': 'Desai',
  'mobileNumber': '6221314568',
  'DOB': '1985/11/25',
  'emailID': 'pankaj@gmail.com',
  'address': 'Pune',
}
firstName, lastName have only alphabet, mobile number should be a valid indian number, DOB- YYYY/MM/DD, email ex abc@gmail.com, address could be long string

```

# get all Customer GET /customer

# Filter

    -starting with first name last name
    -mobile number
    -DOB
    -customer id

# Sort

    -by firstName lastName DOB etc

# fields

    -You can restrict output by particular fields like only firstName, lastName etc

# pagination

    -You get output by page also. You have to send page number and limit of customers per page like page=2limit=5

# delete Customer DELETE /customer

-For deletion you have to send only customer id in body

## Create Card

# POST /card

    -for create a card you have to send only three field from body
    -No multiple card will be allowed for one customer

{
"cardType": "REGULAR",
"vision": "Provide the world's best customer experience every day.",
"customerID": "63a580af70b47374b7c8d414"
}

# GET /card

    -You can apply all filter, sort, limit, pagination like customers on this
