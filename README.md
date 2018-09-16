# Some assumptions:
1. User can block another user, but can never be "unblocked". In inhancement, defriend should be added, similarly to "unsubscribe", "unblock". Otherwise, user can never take action back if he/she blocks another user. Here, 'de-friend' and 'block' are functionally different, as user can still make friend with previously 'de-friended', but can never make friend again with 'blocked' user.
2. Duplicates emails are not allowed in all APIs params, i.e. user can never make friends with him/herself, can never have a common friend,block or subscribe with/to oneself.
3. new API clearFriend is added to the server. Since currently we cannot identify differnet user dataset, so preferrably, trigger the clearFriend API first before any formal testing to initialise the dataset. In future, once we can identify the user group, this api is unnecessary.




# FRIEND API
This is a friends managment API server with testing page.

## 1. Add Friend(post)
|TYPE|POST|
|-------------------------|-------------------------|
|**requeset url**|/api/addFriend|
|**request body**| {friends:[email1,email2]}|
	
|field|type|
|-----------|-----------|
|email1|string|
|email2|string|

**success response**: {
	"success": true,
	"friends" :
	['common@example.com'],
	"count" : 1
}

**fail response**: {
"success": false,
"errorCode" : ###,
"errorText" : "#####"
}

Sample Request

```
{
  email: 'andy@example.com'
}
```

Sample Response

```
{
  "success": true,
  "friends" :
    [
      'john@example.com'
    ],
  "count" : 1   
}
```

## 2. Get Friend List(post)
|TYPE|POST|
|-------------------------|-------------------------|
|**requeset url**|/api/getFriends|
|**request body**|{email: email1}|
	
|field|type|
|-----------|-----------|
|email1|string|

**success response**: {
  "success": true,
  "friends" :
    [
      'john@example.com'
    ],
  "count" : 1
} 

**fail response**: {
"success": false,
"errorCode" : ###,
"errorText" : "#####"
}

Sample Request

```
{
  email: 'andy@example.com'
}
```

Sample Response

```
{
  "success": true,
  "friends" :
    [
      'john@example.com'
    ],
  "count" : 1   
}
```

## 3. Get Common Friend List(post)
|TYPE|POST|
|-------------------------|-------------------------|
|**requeset url**|/api/commonFriend|
|**request body**|{friends:[email1,email2]}|
	
|field|type|
|-----------|-----------|
|email1|string|
|email2|string|

**success response**: {
  "success": true,
  "friends" :
    [
      'common@example.com'
    ],
  "count" : 1
}
**fail response**: {
"success": false,
"errorCode" : ###,
"errorText" : "#####"
}

Sample Request
```
{
  friends:
    [
      'andy@example.com',
      'john@example.com'
    ]
}
```

Sample Response

```
{
  "success": true,
  "friends" :
    [
      'common@example.com'
    ],
  "count" : 1   
}
```

## 4. subscribe to an email(post)
|TYPE|POST|
|-------------------------|-------------------------|
|**requeset url**|/api/subscribeUpdate|
|**request body**|{requestor: email1,target: email2}|
	
|field|type|
|-----------|-----------|
|email1|string|
|email2|string|

**success response**: {
  "success": true
}
**fail response**: {
"success": false,
"errorCode" : ###,
"errorText" : "#####"
}

Sample Request
```
{
  "requestor": "lisa@example.com",
  "target": "john@example.com"
}
```

Sample Response

```
{
  "success": true
}
```

## 5. block an email address(post)
|TYPE|POST|
|-------------------------|-------------------------|
|**requeset url**|/api/block|
|**request body**|{requestor: email1,target: email2}|
	
|field|type|
|-----------|-----------|
|email1|string|
|email2|string|

**success response**: {
  "success": true
}
**fail response**: {
"success": false,
"errorCode" : ###,
"errorText" : "#####"
}
Sample Request
```
{
  "requestor": "andy@example.com",
  "target": "john@example.com"
}
```

Sample Response

```
{
  "success": true
}
```

## 6. retrieve all email addresses can receive update from an email address(post)
|TYPE|POST|
|-------------------------|-------------------------|
|**requeset url**|/api/retrieve|
|**request body**|{sender: email,text: content}|
	
|field|type|
|-----------|-----------|
|email|string|
|content|string|

**success response**: {
  "success": true
  "recipients":
    [
      "lisa@example.com",
      "kate@example.com"
    ]
}

**fail response**: {
"success": false,
"errorCode" : ###,
"errorText" : "#####"
}

Sample Request
```
{
  "sender":  "john@example.com",
  "text": "Hello World! kate@example.com"
}
```

Sample Response

```
{
  "success": true
  "recipients":
    [
      "lisa@example.com",
      "kate@example.com"
    ]
}
```