## Installation

1. Create ``.env`` file from ``.env.example`` file
2. Go to the ``docker-development`` folder
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
## Expected result

```
{
  "data": {
    "getCompanies": [
      {
        "id": "uuid-1",
        "createdAt": "2021-02-26T00:55:36.632Z",
        "parentId": "0",
        "cost": 2110,
        "children": {
          "id": "uuid-2",
          "createdAt": "2021-02-25T10:35:32.978Z",
          "parentId": "uuid-1",
          "cost": 1340,
          "children": {
            "id": "uuid-4",
            "createdAt": "2021-02-25T06:11:47.519Z",
            "parentId": "uuid-2",
            "cost": 1340,
            "children": null
          }
        }
      },
      {
        "id": "uuid-10",
        "createdAt": "2021-02-26T01:39:33.438Z",
        "parentId": "uuid-8",
        "cost": 4288,
        "children": null
      },
      {
        "id": "uuid-11",
        "createdAt": "2021-02-26T00:32:01.307Z",
        "parentId": "uuid-8",
        "cost": 7254,
        "children": {
          "id": "uuid-12",
          "createdAt": "2021-02-25T06:44:56.245Z",
          "parentId": "uuid-11",
          "cost": 2110,
          "children": null
        }
      },
      {
        "id": "uuid-12",
        "createdAt": "2021-02-25T06:44:56.245Z",
        "parentId": "uuid-11",
        "cost": 2110,
        "children": null
      },
      {
        "id": "uuid-13",
        "createdAt": "2021-02-25T20:45:53.518Z",
        "parentId": "uuid-8",
        "cost": 1686,
        "children": null
      },
      {
        "id": "uuid-14",
        "createdAt": "2021-02-25T15:22:08.098Z",
        "parentId": "uuid-11",
        "cost": 7254,
        "children": null
      },
      {
        "id": "uuid-15",
        "createdAt": "2021-02-25T18:00:26.864Z",
        "parentId": "uuid-8",
        "cost": 4725,
        "children": null
      },
      {
        "id": "uuid-16",
        "createdAt": "2021-02-26T01:50:50.354Z",
        "parentId": "uuid-8",
        "cost": 3277,
        "children": null
      },
      {
        "id": "uuid-17",
        "createdAt": "2021-02-25T11:17:52.132Z",
        "parentId": "uuid-3",
        "cost": 4072,
        "children": null
      },
      {
        "id": "uuid-18",
        "createdAt": "2021-02-26T02:31:22.154Z",
        "parentId": "uuid-1",
        "cost": 2033,
        "children": null
      },
      {
        "id": "uuid-19",
        "createdAt": "2021-02-25T21:06:18.777Z",
        "parentId": "uuid-2",
        "cost": 794,
        "children": null
      },
      {
        "id": "uuid-2",
        "createdAt": "2021-02-25T10:35:32.978Z",
        "parentId": "uuid-1",
        "cost": 1340,
        "children": {
          "id": "uuid-4",
          "createdAt": "2021-02-25T06:11:47.519Z",
          "parentId": "uuid-2",
          "cost": 1340,
          "children": null
        }
      },
      {
        "id": "uuid-20",
        "createdAt": "2021-02-26T01:51:25.421Z",
        "parentId": "uuid-3",
        "cost": 908,
        "children": null
      },
      {
        "id": "uuid-3",
        "createdAt": "2021-02-25T15:16:30.887Z",
        "parentId": "uuid-1",
        "cost": 1288,
        "children": {
          "id": "uuid-5",
          "createdAt": "2021-02-25T13:35:57.923Z",
          "parentId": "uuid-3",
          "cost": 1288,
          "children": null
        }
      },
      {
        "id": "uuid-4",
        "createdAt": "2021-02-25T06:11:47.519Z",
        "parentId": "uuid-2",
        "cost": 1340,
        "children": null
      },
      {
        "id": "uuid-5",
        "createdAt": "2021-02-25T13:35:57.923Z",
        "parentId": "uuid-3",
        "cost": 1288,
        "children": null
      },
      {
        "id": "uuid-6",
        "createdAt": "2021-02-26T01:41:06.479Z",
        "parentId": "uuid-3",
        "cost": 2512,
        "children": null
      },
      {
        "id": "uuid-7",
        "createdAt": "2021-02-25T07:56:32.335Z",
        "parentId": "uuid-2",
        "cost": 1636,
        "children": null
      },
      {
        "id": "uuid-8",
        "createdAt": "2021-02-25T23:47:57.596Z",
        "parentId": "uuid-1",
        "cost": 4288,
        "children": {
          "id": "uuid-10",
          "createdAt": "2021-02-26T01:39:33.438Z",
          "parentId": "uuid-8",
          "cost": 4288,
          "children": null
        }
      },
      {
        "id": "uuid-9",
        "createdAt": "2021-02-25T16:02:49.099Z",
        "parentId": "uuid-3",
        "cost": 3086,
        "children": null
      }
    ]
  }
}
```

