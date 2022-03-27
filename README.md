# WTF Did I Do?
WTF Did I Do is a tool for scatterbrained developers who need to know what they have been working on, but don't.
WTF Did I Do will traverse a user's git repositories and compile an ordered list of commits the developer has done over a specific timeframe so they can keep better track of their commits.

## Why?
True, you *could* run `git log` yourself, but this will do it across several projects for you, compiling an date-project ordered list in different formats for your own use in either csv, json or human readable formats.

## Usage
You need `npm` and `node` for this to work. 
After these are installed all you have to do is run `npx wtf-did-i-do` and the script will recursively all sub-folders of the folder you executed the script on, and compile the necessary commits.
The only mandatory options you should provide are `--from <year-month-date>` and `--author <email>`.

## Options
The potential options supported by WTF Did I Do are:

| Option | Description | Accepted Values |
| -------| ----------- | --------------- |
| from   | When to start looking for commits. Formatted in ISO 8061 or year-month-date format | `2022-01-01 \| 2022-01-01T00:00:00.0000Z` |
| until  | When to stop looking for commits.  Formatted in ISO 8061 or year-month-date format | `2022-01-10 \| 2022-01-10T00:00:00.0000Z` |
| author | Email of the user for whom we are looking for commits | |
| format | Format to use for the report | `csv \| json \| human` | 
