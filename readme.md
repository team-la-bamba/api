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
  "question": "5e877e6e4a112d3bd0bae8b9",
  "answer": "5e877e6e4a112d3bd0bae8ba",
  "place": "Huddinge"
}
```

```json
> GET /answers?from=2020-04-03
> GET /answers?from=2020-04-02&to=2020-04-03
> GET /answers?place=huddinge

[
  {
    "_id": "5e878dd6badf384f07e50761",
    "question_id": "5e877e6e4a112d3bd0bae8b9",
    "answer_id": "5e877e6e4a112d3bd0bae8ba",
    "place": "Huddinge",
    "created_at": "2020-04-03T19:26:14.158Z"
  }
]
```

```json
> GET /places

[
  "Huddinge"
]
```