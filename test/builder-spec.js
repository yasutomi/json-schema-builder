/* eslint-env mocha */

const expect = require('chai').expect
const jsonSchemaBuilder = require('../lib/json-schema-builder')

describe('Basic builder tests', function () {
  this.timeout(process.env.TIMEOUT || 5000)

  it('Convert some basic stuff', () => {
    const jsonSchema = jsonSchemaBuilder.dslToJsonSchema(
      {
        title: 'Pizza',
        description: 'A model for storing details of a pizza (recipe, price etc.)',
        propertyHints: [
          {
            key: 'code',
            typeHint: 'text',
            example: 'CHEESE_TOMATO',
            required: true,
            title: 'Unique code of the pizza',
            minLength: 3,
            maxLength: 15,
            primary: true
          },
          {
            key: 'label',
            typeHint: 'text',
            required: true,
            example: 'Cheese & Tomato',
            title: 'Customer-facing label'
          },
          {
            key: 'popularitySeq',
            typeHint: 'integer',
            required: true,
            title: 'Integer value to order lists by',
            minimum: 1
          },
          {
            key: 'imageUri',
            typeHint: 'uri',
            required: true,
            example: 'https://tinyurl.com/y8r5bbu5',
            title: 'URI to an enticing photo of the pizza'
          },
          {
            key: 'crusts',
            typeHint: 'text',
            choiceSet: {
              NORMAL: 'Normal',
              STUFFED: 'Stuffed',
              HOT_DOG: 'Hot Dog'
            },
            multiple: true,
            default: ['NORMAL', 'STUFFED'],
            title: 'Offer which crust options?',
            required: true
          },
          {
            key: 'vegetarian',
            typeHint: 'boolean',
            required: true,
            default: false,
            title: 'Is the pizza suitable for vegetarians?'
          },
          {
            key: 'allergens',
            typeHint: 'text',
            example: ['Gluten', 'Wheat', 'Milk'],
            multiple: true,
            uniqueItems: true,
            title: 'List of allergens present in pizza'
          },
          {
            key: 'availabilityEnd',
            typeHint: 'date',
            example: '2019-12-31',
            required: false,
            title: 'Date when pizza is no longer available.'
          },
          {
            key: 'reviews',
            typeHint: 'object',
            multiple: true,
            title: 'Favourable customer reviews',
            propertyHints: [
              {
                key: 'username',
                example: 'joebloggs4',
                typeHint: 'text',
                required: true,
                title: 'Who wrote the review'
              },
              {
                key: 'review',
                example: 'Lovely stuff!',
                typeHint: 'text',
                required: true,
                title: 'Something nice to say'
              },
              {
                key: 'rating',
                title: 'Star rating (0=Awful 5=Great)',
                example: 5,
                typeHint: 'integer',
                required: true,
                minimum: 0,
                maximum: 5,
                default: 5
              }
            ]
          }
        ]
      }
    )
    // console.log(JSON.stringify(jsonSchema, null, 2))

    expect(jsonSchema).to.eql(
      {
        $schema: 'http://json-schema.org/draft-06/schema#',
        title: 'Pizza',
        description: 'A model for storing details of a pizza (recipe, price etc.)',
        type: 'object',
        properties: {
          code: {
            title: 'Unique code of the pizza',
            examples: [
              'CHEESE_TOMATO'
            ],
            type: 'string',
            typeHint: 'text',
            minLength: 3,
            maxLength: 15
          },
          label: {
            title: 'Customer-facing label',
            examples: [
              'Cheese & Tomato'
            ],
            type: 'string',
            typeHint: 'text'
          },
          popularitySeq: {
            title: 'Integer value to order lists by',
            type: 'integer',
            typeHint: 'integer',
            minimum: 1
          },
          imageUri: {
            title: 'URI to an enticing photo of the pizza',
            examples: [
              'https://tinyurl.com/y8r5bbu5'
            ],
            type: 'string',
            typeHint: 'uri',
            format: 'uri'
          },
          vegetarian: {
            title: 'Is the pizza suitable for vegetarians?',
            default: false,
            type: 'boolean',
            typeHint: 'boolean'
          },
          crusts: {
            title: 'Offer which crust options?',
            default: [
              'NORMAL',
              'STUFFED'
            ],
            type: 'array',
            typeHint: 'text',
            items: {
              type: 'string',
              enum: [
                'NORMAL',
                'STUFFED',
                'HOT_DOG'
              ]
            }
          },
          allergens: {
            title: 'List of allergens present in pizza',
            type: 'array',
            typeHint: 'text',
            examples: [
              [
                'Gluten',
                'Wheat',
                'Milk'
              ]
            ],
            uniqueItems: true,
            items: {
              type: 'string'
            }
          },
          availabilityEnd: {
            title: 'Date when pizza is no longer available.',
            type: 'string',
            typeHint: 'date',
            examples: [
              '2019-12-31'
            ],
            format: 'date-time'
          },
          reviews: {
            title: 'Favourable customer reviews',
            type: 'array',
            typeHint: 'object',
            items: {
              type: 'object',
              properties: {
                username: {
                  title: 'Who wrote the review',
                  type: 'string',
                  typeHint: 'text',
                  examples: [
                    'joebloggs4'
                  ]
                },
                review: {
                  title: 'Something nice to say',
                  type: 'string',
                  typeHint: 'text',
                  examples: [
                    'Lovely stuff!'
                  ]
                },
                rating: {
                  title: 'Star rating (0=Awful 5=Great)',
                  default: 5,
                  examples: [
                    5
                  ],
                  type: 'integer',
                  typeHint: 'integer',
                  minimum: 0,
                  maximum: 5
                }
              },
              required: [
                'username',
                'review',
                'rating'
              ]
            }
          }
        },
        required: [
          'code',
          'label',
          'popularitySeq',
          'imageUri',
          'crusts',
          'vegetarian'
        ],
        primaryKey: [
          'code'
        ]
      }
    )
  })
})
