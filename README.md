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

### Ideals

- The code base is well organized, DRY, easily readable and appropriately commented
- The project’s git commit history is well commented and easy to understand.
- The tests are reliable, and can be executed numerous times in a row without failures

### Tasks

- [x] Happy path tests were built for all major endpoints
- [ ] Negative path tests were built testing for standard failures
- [~] Tests have detailed logs or reports helping to troubleshoot failures
- [x] Tests can be executed in parallel
- [x] Tests are data driven for maximum coverage
- [ ] Personal - Create a blog post about the testing methodology and how this repository covers it.

## Getting Started

1. Download and install NodeJS lts
1. Download and install git
1. Download and install yarn
1. Clone with repository `git clone <url>`
1. Install the project dependancies: `yarn install`
1. Run the tests `yarn test`

[//]: <> (Links Below...)

[json-server]: https://github.com/typicode/json-server
