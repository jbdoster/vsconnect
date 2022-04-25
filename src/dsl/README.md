# Design

## Summary

This application is managed and run by the Electron framework. So the design is setup within 2 main parts in order to maintain code that is:

✅ easy to read

✅ easy to write

✅ easy to test

- "Frontend"

  - [Model View Presenter Pattern](https://www.youtube.com/watch?v=XHw4bBLM8Vk)

- "Backend"

  - [Onion Layered Architecture](https://marcoatschaefer.medium.com/onion-architecture-explained-building-maintainable-software-54996ff8e464#:~:text=The%20Infrastructure%20Layer%20is%20the,the%20Application%20and%20Domain%20layers.)

    - Core

    - Infrastructure

---

## Each Layer

### Infrastructure

Repositories, external APIs, Event listeners, and all other code that deal with IO in some way should be implemented in this layer.

### External

Users

### View

The layer the user iteracts with.
2 responsibilities:

- capture user input and update the presenter layer for coordination
- invoked by the presenter to display updates to the user

### Presenter

The layer that orchestrates the interaction between the model (core) and view layers.
2 responsibilities:

- pass user input to the core
- create the view model for the view to receive and display to the user

### Application Service

2 responsibilities:

- aggregate the data the domain service and domain model need to work with
- orchestrate non-functional side effects that the system needs to run

### Domain Service

2 responsibilities:

- first, validate the data provided by the application service by passing it to the domain model
- second, perform business logic with the provided data

### Domain Model

1 responsibility:

- validate the data for the domain service

---

## Use Cases

Generally, we'll always take a external input and do something- and then repeat this pattern over and over and over.

Use cases are routines that utilize the layers round trip. A use case starts from an invokation from an external entity like a user (or another system in the future).

---

Use Case Sequence Diagram

![architecture-and-design](./resources/plantuml/architecture.sequence.png)
