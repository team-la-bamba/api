## La bamba API

Hello, world

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

[
  {
    "place": "Göteborg",
    "questions": [
      {
        "_id": "5e877e6e4a112d3bd0bae8b9",
        "type": "radio",
        "lang": "sv",
        "text": "Mår du bra?",
        "answers": [
          {
            "_id": "5e877e6e4a112d3bd0bae8ba",
            "text": "Ja",
            "count": 4
          },
          {
            "_id": "5e877e6e4a112d3bd0bae8bb",
            "text": "Nej",
            "count": 0
          }
        ]
      }
    ]
  },
  {
    "place": "Huddinge",
    "questions": [
      {
        "_id": "5e877e6e4a112d3bd0bae8b9",
        "type": "radio",
        "lang": "sv",
        "text": "Mår du bra?",
        "answers": [
          {
            "_id": "5e877e6e4a112d3bd0bae8ba",
            "text": "Ja",
            "count": 0
          },
          {
            "_id": "5e877e6e4a112d3bd0bae8bb",
            "text": "Nej",
            "count": 3
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