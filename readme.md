## La bamba API

Hello, world

## Endpoints

```json
> GET /questions

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
> POST /answers

{
  "question_id": "5e877e6e4a112d3bd0bae8b9",
  "answer_id": "5e877e6e4a112d3bd0bae8ba",
  "place": "Huddinge"
}
```

```json
> GET /answers?from=2020-04-03
> GET /answers?from=2020-04-02&to=2020-04-03
> GET /answers?place=huddinge
```