# Kristempen API

[http://api.labamba.space/](http://api.labamba.space/)

This is one of our contribution for [https://www.hackthecrisis.se/](https://www.hackthecrisis.se/).

## Endpoints

```json
> GET /questions
> GET /questions?lang=en

[
  {
    "type": "radio",
    "lang": "sv",
    "_id": "5e877e6e4a112d3bd0bae8b9",
    "text": "Mår du bra?",
    "answers": [
      {
        "_id": "5e877e6e4a112d3bd0bae8ba",
        "text": "Ja",
        "weight": 5
      },
      {
        "_id": "5e877e6e4a112d3bd0bae8bb",
        "text": "Nej",
        "weight": 10
      }
    ]
  }
]
```

```json
> POST /questions

{
  "text": "Mår du bra?",
  "type": "radio",
  "answers": [
    {
      "text": "Ja",
      "weight": 5
    },
    {
      "text": "Nej",
      "weight": 10
    }
  ]
}
```

```json
> POST /answers

{
  "question": "5e877e6e4a112d3bd0bae8b9",
  "answer": "5e877e6e4a112d3bd0bae8ba",
  "place": "Huddinge"
}
```

```json
> GET /answers?from=2020-04-03
> GET /answers?from=2020-04-02&to=2020-04-03
> GET /answers?place=huddinge
> GET /answers?lang=en
> GET /answers?region=Stockholms Län
> GET /answers?question=5e877e6e4a112d3bd0bae8b9

or with same queries

> GET /timeseries

[
  {
    "question": {
      "_id": "5e889dfe81b78d680a12ab81",
      "type": "radio",
      "lang": "sv",
      "text": "Mår du bra?",
      "answers": [
        {
          "_id": "5e889dfe81b78de31412ab82",
          "text": "Ja",
          "weight": 5,
          "count": 0
        },
        {
          "_id": "5e889dfe81b78d55f112ab83",
          "text": "Nej",
          "weight": 10,
          "count": 0
        }
      ],
      "total": 0
    },
    "places": [
      {
        "place": "Huddinge",
        "answers": [
          {
            "_id": "5e889dfe81b78de31412ab82",
            "text": "Ja",
            "weight": 5,
            "count": 0
          },
          {
            "_id": "5e889dfe81b78d55f112ab83",
            "text": "Nej",
            "weight": 10,
            "count": 0
          }
        ]
      },
      {
        "place": "Stockholm",
        "answers": [
          {
            "_id": "5e889dfe81b78de31412ab82",
            "text": "Ja",
            "weight": 5,
            "count": 0
          },
          {
            "_id": "5e889dfe81b78d55f112ab83",
            "text": "Nej",
            "weight": 10,
            "count": 0
          }
        ]
      }
    ]
  }
]
```

```json
> GET /places

[
  "Huddinge"
]
```