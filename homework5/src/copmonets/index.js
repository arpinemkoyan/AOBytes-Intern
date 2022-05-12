// 1. You need to create a form input validator
// 2. You need to have predefined validators, like required, min, max, email, etc.
// 3. Also you should be able to provide custom validators
// 4. The error message string can be interpolated if extra info is present(min: 3 for example)
// 5. The interface looks like this
// const passportValidator = (extra, message = ‘Default error message’) => {
//     return {
//         validate: () => {
//             // returns true/false
//         },
//         message
//     }
// }
// const schema = new Schema({
//     firstName: {
//         type: ‘string’,
//         validators: [‘min: 3’],
//         message: ‘The field must contain min { min } letters’
//   },
// email: {
//     type: ‘string’,
//     validators: ‘email’
// },
// age: {
//     type: ‘numeric’,
//     validators: [‘required’]
// },
// passport: {
//     type: ‘string’,
//     validators: [‘max: 9’, passportValidator],
//         message: ‘Invalid phone inputs’
// },
// website: {
//     type: ‘string’,
//     validators: [‘url’]
// },
// phoneNumbers: {
//     type: ‘array[string]’,
//     validators: ‘phone’
// }
// });
// schema.validate(payload);
// 6. The schema.validate should be called when form is submitted and if a field has an error,
//     the error message should show up below the field and the for must be scrolled to the first
// field with an error.
// 7. You will need to create a separate reusable component for each of the fields specified in
//     the schema above
// 8. Also ErrorMessage comoponent should be responsible for rendering errors
// Example form
//         < form onSubmit = { validate the form } >
//   <Input name=‘firstName’ onChange={...} />
//   <ErrorMessage errors={errors} />
//   <Email name=‘email’ onChange={...} />
//   <ErrorMessage errors={errors} />
//   <Numeric name=‘age’ onChange={...} />
//   <ErrorMessage errors={errors} />
//   <Passport name=‘passport’ onChange={...} />
//   <ErrorMessage errors={errors} />
//   <Url name=‘website’ onChange={...} />
//   <ErrorMessage errors={errors} />
//   <PhoneNumbers name=‘phoneNumbers’ onChange={...} />
//   <ErrorMessage errors={errors} />
//   <Button type=‘submit’ />
// </form >

