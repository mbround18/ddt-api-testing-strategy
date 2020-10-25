# Data-Driven API Testing Strategy

## Credits

- [json-server - The API used in this class](https://github.com/typicode/json-server)

## Assumptions

- Moderate understanding of how to code in `Javascript|Typescript` or similar language.
- Moderate understanding of `git`.
- Moderate knowledge of `Yarn`.

## The Problem

You have an API you wish to automate and in this scenario we will be taking a look at [json-server].

## Defining Success

When breaking down an API to test, here are some basic acceptance criteria which are a great starting point:

1. The code base is well organized, DRY, easily readable and appropriately commented
1. The project’s git commit history is well commented and easy to understand.
1. The tests are reliable, and can be executed numerous times in a row without failures
1. Happy path tests were built for all major endpoints
1. Negative path tests were built testing for standard failures
1. Tests have detailed logs or reports helping to troubleshoot failures
1. Tests can be executed in parallel
1. Tests are data driven for maximum coverage

[//]: <> (Links Below...)

[json-server]: https://github.com/typicode/json-server
