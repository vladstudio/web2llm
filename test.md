---
rerun_command: node web2llm.js -u "https://beta.tinybase.org/guides/building-uis/" --output "test.md"
---

## Page: https://beta.tinybase.org/guides/building-uis/

These guides cover how to use the `ui-react` module and use React hooks and components to easily build reactive user interfaces with TinyBase.

See also the Countries demo, the Todo App demos, and the Drawing demo.

## Getting Started With ui-react

To build React-based user interfaces with TinyBase, you will need to install the `ui-react` module in addition to the main module, and, of course, React itself. Read more.

## Using React Hooks

There are reactive hooks in the `ui-react` module for accessing every part of a `Store`, as well as more advanced things like the `Metrics` and `Indexes` objects. Read more.

## Using React Components

The reactive components in the `ui-react` module let you declaratively display parts of a `Store`. Read more.

## Using React DOM Components

The reactive components in the `ui-react-dom` module let you declaratively display parts of a `Store` in a web browser, where the ReactDOM module is available. Read more.

## Using Context

The `ui-react` module includes a context provider that lets you avoid passing global objects down through your component hierarchy. Read more.

---

## Page: https://beta.tinybase.org/guides/building-uis/getting-started-with-ui-react/

*   TinyBase
*   Guides
*   Building UIs
*   Getting Started With ui-react

To build React-based user interfaces with TinyBase, you will need to install the `ui-react` module in addition to the main module, and, of course, React itself.

For example, in an HTML file, you can get started with boilerplate that might look like this:

    <html>
      <head>
        <title>My First TinyBase App</title>
        <script type="importmap">
          {
            "imports": {
              "tinybase": "https://esm.sh/tinybase@6.1.0-beta.1",
              "tinybase/ui-react": "https://esm.sh/tinybase@6.1.0-beta.1/ui-react",
              "react": "https://esm.sh/react@^19.0.0",
              "react/jsx-runtime": "https://esm.sh/react@^19.0.0/jsx-runtime",
              "react-dom/client": "https://esm.sh/react-dom@^19.0.0/client"
            }
          }
        </script>
        <script type="module" src="https://esm.sh/tsx"></script>
        <script type="text/jsx">
          import {createStore} from "tinybase";
          import {CellView} from "tinybase/ui-react";
          import {createRoot} from "react-dom/client";
          import React from "react";
    
          const store = createStore();
          store.setCell('t1', 'r1', 'c1', 'Hello World');
          createRoot(document.body).render(
            <CellView store={store} tableId="t1" rowId="r1" cellId="c1" />,
          );
        </script>
      </head>
      <body />
    </html>
    

Open this file in your browser and you should see the words 'Hello World' on the screen, having been written to, and read from, a `Store`, and then rendered by the `CellView` component from the `ui-react` module.

Note that the standalone `https://esm.sh/tsx` script and `text/jsx` type on the script here are merely to support JSX in the browser and for the purposes of illustrating how to get started quickly. In a production environment you should pre-compile and your JSX and modules to create a bundled browser app. If you're bundling the whole app, you can of course import the `ui-react` module something like this.

Boilerplate aside, let's move on to understand how to use hooks in the `ui-react` module, with the Using React Hooks guide.

---

## Page: https://beta.tinybase.org/guides/building-uis/using-react-hooks/

There are reactive hooks in the `ui-react` module for accessing every part of a `Store`, as well as more advanced things like the `Metrics` and `Indexes` objects.

By reactive hooks, we mean that the hook not only fetches part of the `Store`, but that it also registers a listener that will then cause a component to re-render if the underlying value changes. Therefore, it's easy to describe a user interface in terms of raw data in a `Store`, and know that it will stay updated when the data changes.

To start with a simple example, we use the `useCell` hook in a component called `App` to get the value of a `Cell` and render it in a `<span>` element. When the `Cell` is updated, so is the HTML.

    import React from 'react';
    import {createRoot} from 'react-dom/client';
    import {createStore} from 'tinybase';
    import {useCell} from 'tinybase/ui-react';
    
    const store = createStore().setCell('pets', 'fido', 'color', 'brown');
    const App = () => <span>{useCell('pets', 'fido', 'color', store)}</span>;
    
    const app = document.createElement('div');
    const root = createRoot(app);
    root.render(<App />);
    console.log(app.innerHTML);
    // -> '<span>brown</span>'
    
    store.setCell('pets', 'fido', 'color', 'walnut');
    console.log(app.innerHTML);
    // -> '<span>walnut</span>'
    

There are hooks that correspond to each of the `Store` getter methods:

*   The `useValues` hook is the reactive equivalent of the `getValues` method.
*   The `useValueIds` hook is the reactive equivalent of the `getValueIds` method.
*   The `useValue` hook is the reactive equivalent of the `getValue` method.

And for tabular data:

*   The `useTables` hook is the reactive equivalent of the `getTables` method.
*   The `useTableIds` hook is the reactive equivalent of the `getTableIds` method.
*   The `useTable` hook is the reactive equivalent of the `getTable` method.
*   The `useTableCellIds` hook is the reactive equivalent of the `getTableCellIds` method.
*   The `useRowIds` hook is the reactive equivalent of the `getRowIds` method.
*   The `useSortedRowIds` hook is the reactive equivalent of the `getSortedRowIds` method.
*   The `useRow` hook is the reactive equivalent of the `getRow` method.
*   The `useCellIds` hook is the reactive equivalent of the `getCellIds` method.
*   The `useCell` hook is the reactive equivalent of the `getCell` method.

They have the same return types. For example, the `useTable` hook returns an object:

    import {useTable} from 'tinybase/ui-react';
    
    const App2 = () => <span>{JSON.stringify(useTable('pets', store))}</span>;
    root.render(<App2 />);
    console.log(app.innerHTML);
    // -> '<span>{"fido":{"color":"walnut"}}</span>'
    
    store.setCell('pets', 'fido', 'species', 'dog');
    console.log(app.innerHTML);
    // -> '<span>{"fido":{"color":"walnut","species":"dog"}}</span>'
    

When the component is unmounted, the listener will be automatically removed. This means you can use these hooks without having to worry too much about the lifecycle of how your component interacts with the `Store`.

### Using Hooks To Set Data

In an interactive application, you don't just want to read data. You also want to be able to set it in response to user's actions. For this purpose, there is a group of hooks that return callbacks for setting data based on events.

Let's start with a simple example, the `useSetCellCallback` hook. The `Cell` to be updated needs to be identified by the `Table`, `Row`, and `Cell` `Id` parameters. The fourth parameter to the hook is a parameterized callback (that will be memoized based on the dependencies in the fifth parameter). The responsibility of that function is to return the value that will be used to update the `Cell`.

It's probably easier to understand with an example:

    import {useSetCellCallback} from 'tinybase/ui-react';
    
    const App3 = () => {
      const handleClick = useSetCellCallback(
        'pets',
        'fido',
        'sold',
        (event) => event.bubbles,
        [],
        store,
      );
      return (
        <span>
          Sold: {useCell('pets', 'fido', 'sold', store) ? 'yes' : 'no'}
          <br />
          <button onClick={handleClick}>Sell</button>
        </span>
      );
    };
    root.render(<App3 />);
    console.log(app.innerHTML);
    // -> '<span>Sold: no<br><button>Sell</button></span>'
    
    const button = app.querySelector('button');
    // User clicks the <button> element:
    // -> button MouseEvent('click', {bubbles: true})
    
    console.log(store.getTables());
    // -> {pets: {fido: {color: 'walnut', species: 'dog', sold: true}}}
    console.log(app.innerHTML);
    // -> '<span>Sold: yes<br><button>Sell</button></span>'
    

In the real-world, a more valid case for using the event parameter might be to handle the content of a text input to write into the `Store`. See the Todo demo for a working example of doing that with the `useAddRowCallback` hook to add new todos.

### Other Hook Types

The hooks to read and write `Store` data (described above) will be the ones you most commonly use. For completeness, there are three other broad groups of hooks. Firstly, there are those that create callbacks to delete data (such as the `useDelRowCallback` hook), which should be self-explanatory.

Then there are hooks that are used to create objects (including `Store` objects, but also `Metrics`, and `Indexes` objects, and so on). These are essentially convenient aliases for memoization so that object creation can be performed inside a component without fear of creating a new instance per render:

    import {useCreateStore} from 'tinybase/ui-react';
    
    const App4 = () => {
      const store = useCreateStore(() => {
        console.log('Store created');
        return createStore().setTables({pets: {fido: {species: 'dog'}}});
      });
      return <span>{store.getCell('pets', 'fido', 'species')}</span>;
    };
    
    root.render(<App4 />);
    // -> 'Store created'
    
    root.render(<App4 />);
    // No second Store creation
    

There is also a final group of hooks that add listeners (such as the `useCellListener` hook). Since the regular hooks (like the `useCell` hook) already register listeners to track changes, you won't often need to use these unless you need to establish a listener in a component that has some other side-effect, such as mutating data to enforce a schema, for example.

### Summary

The hooks available in the `ui-react` module make it easy to connect your user interface to TinyBase `Store` data. It also contains some convenient components that you can use to build your user interface more declaratively. For that, let's proceed to the Using React Components guide.

---

## Page: https://beta.tinybase.org/guides/building-uis/using-react-components/

The reactive components in the `ui-react` module let you declaratively display parts of a `Store`.

These are all essentially convenience wrappers around the hooks we described in the Using React Hooks guide, but make it easy to build hierarchical component trees from the `Store` data. For example, the `ValuesView` component wraps around the `useValueIds` hook to render child `ValueView` components. Similarly, the `TablesView` component wraps around the `useTableIds` hook to render child `TableView` components, which in turn can render child `RowView` components and `CellView` components.

In this simple example, the `CellView` component is used to render the color `Cell` in a `<span>`:

    import React from 'react';
    import {createRoot} from 'react-dom/client';
    import {createStore} from 'tinybase';
    import {CellView} from 'tinybase/ui-react';
    
    const store = createStore().setCell('pets', 'fido', 'color', 'brown');
    const App = () => (
      <span>
        <CellView tableId="pets" rowId="fido" cellId="color" store={store} />
      </span>
    );
    
    const app = document.createElement('div');
    const root = createRoot(app);
    root.render(<App />);
    console.log(app.innerHTML);
    // -> '<span>brown</span>'
    
    store.setCell('pets', 'fido', 'color', 'walnut');
    console.log(app.innerHTML);
    // -> '<span>walnut</span>'
    

These components have very plain default renderings, and don't even generate HTML or use ReactDOM. This means that the `ui-react` module works just as well with React Native or other React-based rendering systems.

It does mean though, that if you use the default `RowView` component, you will simply render a concatenation of the values of its Cells:

    import {RowView} from 'tinybase/ui-react';
    
    store.setCell('pets', 'fido', 'weight', 42);
    const App2 = () => (
      <span>
        <RowView tableId="pets" rowId="fido" store={store} />
      </span>
    );
    
    root.render(<App2 />);
    console.log(app.innerHTML);
    // -> '<span>walnut42</span>'
    

This is not a particularly nice rendering! Even for the purposes of debugging data, you may want to separate the values, and this can be cheaply done with the `separator` prop:

    const App3 = () => (
      <span>
        <RowView tableId="pets" rowId="fido" store={store} separator="," />
      </span>
    );
    
    root.render(<App3 />);
    console.log(app.innerHTML);
    // -> '<span>walnut,42</span>'
    

Going further, the `debugIds` prop helps you see the structure of the objects with their `Ids`.

    const App4 = () => (
      <span>
        <RowView tableId="pets" rowId="fido" store={store} debugIds={true} />
      </span>
    );
    
    root.render(<App4 />);
    console.log(app.innerHTML);
    // -> '<span>fido:{color:{walnut}weight:{42}}</span>'
    

These are slightly more readable, but are still not really appropriate to actually build a user interface! For that we need to understand how to customize components.

### Customizing Components

More likely than JSON-like strings, you will want to customize or compose the rendering of parts of the `Store` for your UI. The way this works is that each of the react-ui module components has a prop that takes an alternative rendering for its children.

For example, the `TableView` component takes a `rowComponent` prop that lets you indicate how each `Row` should be rendered, and the `RowView` component takes a `cellComponent` prop that lets you indicate how each `Cell` should be rendered. The component passed in to such props itself needs to be capable of taking the same props that the default component would have.

To render the contents of a `Table` into an HTML table, therefore, you might set the components up like this:

    import {TableView} from 'tinybase/ui-react';
    
    const MyTableView = (props) => (
      <table>
        <tbody>
          <TableView {...props} rowComponent={MyRowView} />
        </tbody>
      </table>
    );
    
    const MyRowView = (props) => (
      <tr>
        <th>{props.rowId}</th>
        <RowView {...props} cellComponent={MyCellView} />
      </tr>
    );
    
    const MyCellView = (props) => (
      <td>
        <CellView {...props} />
      </td>
    );
    
    const App5 = () => <MyTableView store={store} tableId="pets" />;
    root.render(<App5 />);
    console.log(app.innerHTML);
    // -> '<table><tbody><tr><th>fido</th><td>walnut</td><td>42</td></tr></tbody></table>'
    

That is now starting to resemble a useful UI for tabular data! A final touch here is that each view can also let you create custom props for each of its children. For example the `getRowComponentProps` prop of the `TableView` component should be a function that returns additional props that will be passed to each child. See the API documentation for more examples.

### Summary

The components available in the `ui-react` module make it easy to enumerate over objects to build your user interface with customized, composed components. This will work wherever the React module does, including React Native.

When you are building an app in a web browser, however, where the ReactDOM module is available, TinyBase includes pre-made HTML components. We will look at these in the next Using React DOM Components guide.

---

## Page: https://beta.tinybase.org/guides/building-uis/using-react-dom-components/

The reactive components in the `ui-react-dom` module let you declaratively display parts of a `Store` in a web browser, where the ReactDOM module is available.

These are generally implementations of the components we discussed in the previous guide, but are specifically designed to render HTML content in a browser.

Styling and class names are very basic, since you are expected to style them with CSS to fit your app's overall styling.

The easiest way to understand these components is to see them all in action in the UI Components demos. There are table-based components for rendering `Tables`, sorted `Tables`, `Values`, and so on:

| Component | Purpose |  |
| --- | --- | --- |
| `ValuesInHtmlTable` | Renders `Values`. | demo |
| `TableInHtmlTable` | Renders a `Table`. | demo |
| `SortedTableInHtmlTable` | Renders a sorted `Table`, with optional interactivity. | demo |
| `SliceInHtmlTable` | Renders a `Slice` from an `Index`. | demo |
| `RelationshipInHtmlTable` | Renders the local and remote `Tables` of a relationship | demo |
| `ResultTableInHtmlTable` | Renders a `ResultTable`. | demo |
| `ResultSortedTableInHtmlTable` | Renders a sorted `ResultTable`, with optional interactivity. | demo |

There are also editable components for individual Cells and `Values`:

| Component | Purpose |  |
| --- | --- | --- |
| `EditableCellView` | Renders a `Cell` and lets you change its type and value. | demo |
| `EditableValueView` | Renders a `Value` and lets you change its type and value. | demo |

We finish off this section with a best practice to avoid passing the global `Store` down into components. Please proceed to to the Using Context guide!

---

## Page: https://beta.tinybase.org/guides/building-uis/using-context/

The `ui-react` module includes a context provider that lets you avoid passing global objects down through your component hierarchy.

One thing you may have noticed (especially with the hooks) is how we've had to reference the global `Store` object within components (or potentially drill it through the hierarchy with props). It's very likely that your whole app (or parts of it) will use the same `Store` throughout, though.

To help with this, the `Provider` component lets you specify a `Store` that all the hooks and components will bind to automatically. Simply provide the `Store` in the `store` prop, and it will be used by default. Notice how the `store` variable is not referenced in the child `Pane` component here, for example:

    import React from 'react';
    import {createRoot} from 'react-dom/client';
    import {createStore} from 'tinybase';
    import {CellView, Provider, useCell, useCreateStore} from 'tinybase/ui-react';
    
    const App = () => {
      const store = useCreateStore(() =>
        createStore().setTables({pets: {fido: {species: 'dog', color: 'brown'}}}),
      );
    
      return (
        <Provider store={store}>
          <Pane />
        </Provider>
      );
    };
    
    const Pane = () => (
      <span>
        <CellView tableId="pets" rowId="fido" cellId="species" />,
        {useCell('pets', 'fido', 'color')}
      </span>
    );
    
    const app = document.createElement('div');
    const root = createRoot(app);
    root.render(<App />);
    console.log(app.innerHTML);
    // -> '<span>dog,brown</span>'
    

Obviously this requires your components to be used in a context where you know the right sort of `Store` will be available.

### Context With Multiple Stores

In cases where you want to have multiple `Store` objects available to an application, the `Provider` component takes a `storesById` prop that is an object keyed by `Id`. Your hooks and components use the `Id` to indicate which they want to use:

    const App2 = () => {
      const petStore = useCreateStore(() =>
        createStore().setTables({pets: {fido: {species: 'dog'}}}),
      );
      const planetStore = useCreateStore(() =>
        createStore().setTables({planets: {mars: {moons: 2}}}),
      );
    
      return (
        <Provider storesById={{pet: petStore, planet: planetStore}}>
          <Pane2 />
        </Provider>
      );
    };
    
    const Pane2 = () => (
      <span>
        <CellView tableId="pets" rowId="fido" cellId="species" store="pet" />,
        {useCell('planets', 'mars', 'moons', 'planet')}
      </span>
    );
    
    root.render(<App2 />);
    console.log(app.innerHTML);
    // -> '<span>dog,2</span>'
    

### Nesting Context

`Provider` components can be nested and the contexts are merged. This last example is a little verbose, but shows how two `Store` objects each keyed with a different `Id` are both visible, despite having been set in two different `Provider` components:

    const App3 = () => {
      const petStore = useCreateStore(() =>
        createStore().setTables({pets: {fido: {species: 'dog'}}}),
      );
    
      return (
        <Provider storesById={{pet: petStore}}>
          <OuterPane />
        </Provider>
      );
    };
    
    const OuterPane = () => {
      const planetStore = useCreateStore(() =>
        createStore().setTables({planets: {mars: {moons: 2}}}),
      );
      return (
        <Provider store={planetStore}>
          <InnerPane />
        </Provider>
      );
    };
    
    const InnerPane = () => (
      <span>
        <CellView tableId="pets" rowId="fido" cellId="species" store="pet" />,
        {useCell('planets', 'mars', 'moons')}
      </span>
    );
    
    root.render(<App3 />);
    console.log(app.innerHTML);
    // -> '<span>dog,2</span>'
    

### Summary

We have covered the main parts of the `ui-react` module, including its hooks and components, and the way it supports context to make `Store` objects available.

Next we talk about how a `Store` can have a `TablesSchema` and can be persisted. Let's move onto the Schemas guide to find out more.