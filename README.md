## Installation

1. Create ``.env`` file from ``.env.example`` file

2. Run command
```bash
$ docker compose up --build
or
$ docker-compose up --build
```

## The app running on

```bash
localhost:3001/graphql
```

## Graphql query to get list companies

```bash
query {
  getCompanies {
    id
    createdAt
    parentId
    cost
    children {
      id
      createdAt
      parentId
      cost
      children {
        id
        createdAt
        parentId
        cost
        children {
          id
          ## and so on
        }
      }
    }
  }
}
```
