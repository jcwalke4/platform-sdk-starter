import {
  BooleanField,
  NumberField,
  Sheet,
  TextField,
  Workbook,
} from '@flatfile/configure'

const CategoryAndBoolean = new Sheet(
  'CategoryAndBoolean',
  {
    firstName: TextField({
      required: true,
      description: 'foo',
      compute: (v) => v.toUpperCase(),
    }),
    age: NumberField(),
    testBoolean: BooleanField({ default: false }),
  },
  {
    allowCustomFields: true,
    readOnly: true,
    recordCompute: (record, _session, _logger) => {
      const age = record.get('age')
      const newAge = typeof age === 'number' ? age * 2 : 0
      record.set('age', newAge)
    },
  }
)

export default new Workbook({
  name: `Test Workbook`,
  namespace: 'test',
  sheets: { CategoryAndBoolean },
})
