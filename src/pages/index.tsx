import { Link } from 'gatsby';
import { FormattedMessage } from 'gatsby-plugin-intl';
import React from 'react';
import { useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import Layout from '../components/Layout';
import SEO from '../components/seo';
import { State as ReduxState } from '../reducers';

const IndexPage = () => {
  const firebase = useFirebase();
  function addSampleTodo() {
    const sampleTodo = { text: 'Sample', done: false };
    return firebase.push('todos', sampleTodo);
  }

  function todos() {
    useFirebaseConnect([
      'todos', // { path: '/todos' } // object notation
    ]);

    const todos = useSelector(
      (state: ReduxState) => state.firebase.ordered.todos
    );

    if (!isLoaded(todos)) {
      return <div>Loading...</div>;
    }

    if (isEmpty(todos)) {
      return <div>Todos List Is Empty</div>;
    }

    return (
      <div>
        <ul>
          {Object.keys(todos).map((key, id) => (
            <li key={key}>
              {todos[key]}-{id}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <Layout>
      <SEO title="Manonet" />
      <h1>HomePage</h1>
      <button onClick={addSampleTodo}>Add</button>
      {todos()}
      <h3>
        <FormattedMessage id="site.underDevelopement" />
      </h3>

      <p>
        <FormattedMessage id="site.description" />
      </p>
      <p>
        You can find more info in{' '}
        <a href="https://github.com/manonet/typing/">Github repository</a>
      </p>
      <Link to="/typewriter/">Go to the Typewriter</Link>
    </Layout>
  );
};

export default IndexPage;
