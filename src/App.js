import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

const AddListsForm = ({ addLists }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    value && addLists(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        placeholder="Add an asset for watchlist…"
        onChange={(e) => setValue(e.target.value)}
        data-testid="cypress-react-test-input"
      />
      <button type="submit" data-testid="cypress-react-test-add">
        Add
      </button>
    </form>
  );
};

const ShowList = (props) => (
  <>
    {props.lists.map((list, index) => (
      <div className="watch" key={index}>
        <span className="watch-text">{list.symbol}</span>
        <button
          onClick={() => props.removeItem(index)}
          data-testid="cypress-react-test-delete"
        >
          Delete
        </button>
      </div>
    ))}
  </>
);

export const WatchList = () => {
  const [lists, setLists] = useState([
    {
      symbol: 'NIO',
    },
    {
      symbol: 'BTC',
    },
  ]);

  const addLists = (symbol) => setLists([...lists, { symbol }]);

  const removeItem = (index) => {
    const newLists = [...lists];
    newLists.splice(index, 1);
    setLists(newLists);
  };

  return (
    <div className="watch-list">
      <ShowList lists={lists} removeItem={removeItem} />
      <AddListsForm addLists={addLists} />
    </div>
  );
};

const MyTextInput = (props) => {
  const { field, type } = props;

  return (
    <input {...field} type={type} placeholder={'ENTER YOUR ' + field.name} />
  );
};
function App() {
  const [result, setResult] = useState('');
  return (
    <div>
      <h1>Show me the field values!</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setResult(JSON.stringify(values, null, 2));
          resetForm({});
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field name="email" type="email" component={MyTextInput} />
            <ErrorMessage name="email" component="div" />
            <br />
            <Field type="password" name="password" component={MyTextInput} />
            <ErrorMessage name="password" component="div" />
            <br />
            <button
              className="submit-btn"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <br />
      <div className="result-field" style={{ whiteSpace: 'pre' }}>
        <code>{result}</code>
      </div>
      <WatchList />
    </div>
  );
}

export default App;
