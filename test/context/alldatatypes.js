exports = module.exports = function (roa) {
  'use strict';

  var $s = roa.schemaUtils;
  var $q = roa.queryUtils;

  var ret = {
    type: '/alldatatypes',
    'public': true, // eslint-disable-line
    secure: [],
    schema: {
      $schema: 'http://json-schema.org/schema#',
      title: 'A set of resources for the generic filters',
      type: 'object',
      properties: {
        id: $s.numeric('Identificator'),
        text: $s.string('A text field.'),
        text2: $s.string('Another text field.'),
        texts: $s.array('A collection of text.'),
        publication: $s.timestamp('A timestamp field.'),
        publications: $s.array('A collection of timestamps.'),
        number: $s.numeric('A numeric field.'),
        numbers: $s.array('A collection of numbers.')
      },
      required: []
    },
    validate: [],
    map: {
      id: {},
      text: {},
      text2: {},
      texts: {},
      publication: {},
      publications: {},
      number: {},
      numbers: {}
    },
    query: {
      defaultFilter: $q.defaultFilter
    },
    defaultlimit: 5,
    maxlimit: 50
  };

  return ret;
};