## La bamba API

Hello, world

## Endpoints

```
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
        "text": "Ja"
      },
      {
        "_id": "5e877e6e4a112d3bd0bae8bb",
        "text": "Nej"
      }
    ]
  }
]
```
> POST /answers

{
	"question_id": "5e877e6e4a112d3bd0bae8b9",
	"answer_id": "5e877e6e4a112d3bd0bae8ba",
	"place": "Huddinge"
}
```