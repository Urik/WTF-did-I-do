# WTF Did I Do?
WTF Did I Do is a tool for scatterbrained developers who need to know what they have been working on, but don't.  
WTF Did I Do will traverse a user's git repositories and compile an ordered list of commits the developer has done over a specific timeframe so they can keep better track of their commits.

## Why?
True, you *could* run `git log` yourself, but this will do it across several projects for you, compiling a date-project ordered list in different formats for your own use in either csv, json or human readable formats.

## Usage
You need `npm` and `node` for this to work.   
After these are installed all you have to do is run `npx wtf-did-i-do` and the script will recursively all sub-folders of the folder you executed the script on, and compile the necessary commits.  
The only mandatory options you should provide are `--from <year-month-date>` and `--author <email>`.

Output will be sent to standard output, which can be sent to a file as `npx wtf-did-i-do --from 2022-01-01 --author elvispresley@spies.com --format json > output.json`

## Options
The options supported by WTF Did I Do are:

| Option | Description | Accepted Values |
| -------| ----------- | --------------- |
| from   | When to start looking for commits. Formatted in ISO 8061 or year-month-date format | `2022-01-01 \| 2022-01-01T00:00:00.0000Z` |
| until  | When to stop looking for commits.  Formatted in ISO 8061 or year-month-date format | `2022-01-10 \| 2022-01-10T00:00:00.0000Z` |
| author | Email of the user for whom we are looking for commits | |
| format | Format to use for the report | `csv \| json \| human` | 

## Sample outputs

### CSV
```
date,author,repository,message,body
2022-03-27T12:22:48-04:00,uribk@unito.io,/home/uri/WTF-did-I-do,Sample message 2,"Sample body 2
"
2022-03-27T12:22:36-04:00,uribk@unito.io,/home/uri/WTF-did-I-do,Sample message 1,"Sample Body 1
"
2022-03-27T12:20:29-04:00,uribk@unito.io,/home/uri/WTF-did-I-do,improved documentation,
```

### JSON
```
[
  {
    "date": "2022-03-27T12:22:48-04:00",
    "author": "uribk@unito.io",
    "repository": "/home/uri/WTF-did-I-do",
    "message": "Sample message 2",
    "body": "Sample body 2\n"
  },
  {
    "date": "2022-03-27T12:22:36-04:00",
    "author": "uribk@unito.io",
    "repository": "/home/uri/WTF-did-I-do",
    "message": "Sample message 1",
    "body": "Sample Body 1\n"
  },
  {
    "date": "2022-03-27T12:20:29-04:00",
    "author": "uribk@unito.io",
    "repository": "/home/uri/WTF-did-I-do",
    "message": "improved documentation",
    "body": ""
  }
]

```

### Human
```
Date: 2022-03-27, 12:22:48 p.m.
Author: uribk@unito.io
Repository: /home/uri/WTF-did-I-do
Message: Sample message 2

Body: 
Sample body 2


========================================================================

Date: 2022-03-27, 12:22:36 p.m.
Author: uribk@unito.io
Repository: /home/uri/WTF-did-I-do
Message: Sample message 1

Body: 
Sample Body 1


========================================================================

Date: 2022-03-27, 12:20:29 p.m.
Author: uribk@unito.io
Repository: /home/uri/WTF-did-I-do
Message: improved documentation

```
