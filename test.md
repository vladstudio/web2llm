---
command_args:
  url:
    - https://beta.tinybase.org/guides/the-basics/
    - https://beta.tinybase.org/guides/building-uis/
  selector: article
  crawl-mode: strict
  output: test.md
---

## Page: https://beta.tinybase.org/guides/the-basics/

*   [TinyBase](/)
*   [Guides](/guides/)
*   [The Basics](/guides/the-basics/)

The Basics
==========

These guides cover the very basics of TinyBase.

We start with common ways to install the modules and then learn about how to interact with [`Store`](/api/store/interfaces/store/store/) objects including creation, reading data, writing data, and listening for changes.

See also the [Hello World](/demos/hello-world/) demos, and the [Todo App](/demos/todo-app/) demos.

Let's get started!

Getting Started
---------------

This guide gets you up and running quickly with TinyBase. [Read more](/guides/the-basics/getting-started/).

Creating A Store
----------------

This guide shows you how to create a new [`Store`](/api/store/interfaces/store/store/). [Read more](/guides/the-basics/creating-a-store/).

Writing To Stores
-----------------

This guide shows you how to write data to a [`Store`](/api/store/interfaces/store/store/). [Read more](/guides/the-basics/writing-to-stores/).

Reading From Stores
-------------------

This guide shows you how to read data from a [`Store`](/api/store/interfaces/store/store/). [Read more](/guides/the-basics/reading-from-stores/).

Listening To Stores
-------------------

This guide shows you how to listen to changes in the data in a [`Store`](/api/store/interfaces/store/store/). [Read more](/guides/the-basics/listening-to-stores/).

Transactions
------------

This guide shows you how to wrap multiple changes to the data in a [`Store`](/api/store/interfaces/store/store/). [Read more](/guides/the-basics/transactions/).

Importing TinyBase
------------------

This guide provides an aside about importing TinyBase into your application. [Read more](/guides/the-basics/importing-tinybase/).

TinyBase And TypeScript
-----------------------

This guide summarizes the two different levels of TypeScript coverage you can use with TinyBase. [Read more](/guides/the-basics/tinybase-and-typescript/).

Architectural Options
---------------------

This guide discusses some of the ways in which you can use TinyBase, and how you can architect it into the bigger picture of how your app is built. [Read more](/guides/the-basics/architectural-options/).

---

## Page: https://beta.tinybase.org/guides/the-basics/getting-started/

*   [TinyBase](/)
*   [Guides](/guides/)
*   [The Basics](/guides/the-basics/)
*   [Getting Started](/guides/the-basics/getting-started/)

Getting Started
===============

This guide gets you up and running quickly with TinyBase.

It is not intended to be a detailed introduction to installing JavaScript build- and run-time environments! It assumes that you have (or know how to have) a browser or Node-based development environment.

Note that TinyBase requires a reasonably modern environment, as it makes extensive use of contemporary JavaScript features. A regularly-updated browser and Node 16 (or above) are recommended. If you find you need older compatibility, there are additional transpilations in the `es6` folder of the distribution.

Let's go!

### TinyBase from a template

[Vite](https://vitejs.dev/) is a build tool that makes it easy to get started with modern web projects based on application templates. To use the TinyBase template, firstly make a copy of it:

    npx tiged tinyplex/vite-tinybase my-tinybase-app
    

Then go into the directory, install the dependencies, and run the application:

    cd my-tinybase-app
    npm install
    npm run dev
    

The final step will display a local URL, which should serve up a basic TinyBase application for you:

![Thumbnail of Vite app](/vite-tinybase.png "Thumbnail of Vite app")

In fact, there are eleven templates for TinyBase, depending on whether you want to use TypeScript or React, and the integrations you want to target. Instructions are available in the README of each:

Template

Language

React

Plus

[vite-tinybase](https://github.com/tinyplex/vite-tinybase)

JavaScript

No

[vite-tinybase-ts](https://github.com/tinyplex/vite-tinybase-ts)

TypeScript

No

[vite-tinybase-react](https://github.com/tinyplex/vite-tinybase-react)

JavaScript

Yes

[vite-tinybase-ts-react](https://github.com/tinyplex/vite-tinybase-ts-react)

TypeScript

Yes

[vite-tinybase-ts-react-sync](https://github.com/tinyplex/vite-tinybase-ts-react-sync)

TypeScript

Yes

[Synchronization](/guides/synchronization/)

[vite-tinybase-ts-react-sync-durable-object](https://github.com/tinyplex/vite-tinybase-ts-react-sync-durable-object)

TypeScript

Yes

Sync & Durable Objects

[vite-tinybase-ts-react-pglite](https://github.com/tinyplex/vite-tinybase-ts-react-pglite)

TypeScript

Yes

PGlite

[vite-tinybase-ts-react-crsqlite](https://github.com/tinyplex/vite-tinybase-ts-react-crsqlite)

TypeScript

Yes

CR-SQLite

[tinybase-ts-react-partykit](https://github.com/tinyplex/tinybase-ts-react-partykit)

TypeScript

Yes

PartyKit

[tinybase-ts-react-electricsql](https://github.com/tinyplex/tinybase-ts-react-electricsql)

TypeScript

Yes

ElectricSQL

[expo/examples/with-tinybase](https://github.com/expo/examples/tree/master/with-tinybase)

JavaScript

Yes

React Native & Expo

### TinyBase in a browser

Another simple way to get started with TinyBase is to include it from a CDN in a web page. Create a file called `index.html`, for example:

    <html>
      <head>
        <title>My First TinyBase App</title>
        <script type="importmap">
          {"imports": {"tinybase": "https://esm.sh/tinybase@6.0.0"}}
        </script>
        <script type="module">
          import {createStore} from 'tinybase';
    
          addEventListener('load', () => {
            const store = createStore();
            store.setValue('v1', 'Hello');
            store.setCell('t1', 'r1', 'c1', 'World');
    
            document.body.innerHTML =
              store.getValue('v1') + ' ' + store.getCell('t1', 'r1', 'c1');
          });
        </script>
      </head>
      <body />
    </html>
    

Open this file in your browser and you should see the words '[Hello World](/demos/hello-world/)' on the screen, each having been written to, and read from, a [`Store`](/api/store/interfaces/store/store/).

Note that the TinyBase module is pulled in from esm.sh, and the `importmap` allows you to use a regular import statement in the main script section.

### TinyBase in a Node application

TinyBase is packaged on NPM, so you can easily install it as a dependency for your application.

    mkdir MyFirstTinyBaseApp
    cd MyFirstTinyBaseApp
    npm init -y
    npm install tinybase
    

Create a file in this directory called `index.mjs`:

    import {createStore} from 'tinybase';
    
    const store = createStore();
    store.setValue('v1', 'Hello');
    store.setCell('t1', 'r1', 'c1', 'World');
    console.log(store.getValue('v1') + ' ' + store.getCell('t1', 'r1', 'c1'));
    

Run this module script with:

    node index.mjs
    

Again, you will see the words '[Hello World](/demos/hello-world/)' on the screen, having each been written to, and read from, a [`Store`](/api/store/interfaces/store/store/).

If that all worked, you are set up and ready to learn more about TinyBase! From here on, we will mostly show Node-based code snippets, but most should be easily translatable to run in a browser too.

Before we move on, you should be aware that the overall package includes a number of different versions of TinyBase, transpiled for different targets and formats. You may want to take a look at the [Importing TinyBase](/guides/the-basics/importing-tinybase/) guide if the code above isn't working in your environment - React Native in particular.

Let's move onto the [Creating A Store](/guides/the-basics/creating-a-store/) guide.

---

## Page: https://beta.tinybase.org/guides/the-basics/creating-a-store/

*   [TinyBase](/)
*   [Guides](/guides/)
*   [The Basics](/guides/the-basics/)
*   [Creating A Store](/guides/the-basics/creating-a-store/)

Creating A Store
================

This guide shows you how to create a new [`Store`](/api/store/interfaces/store/store/).

Creating a [`Store`](/api/store/interfaces/store/store/) requires just a simple call to the [`createStore`](/api/store/functions/creation/createstore/) function from the [`store`](/api/store/) module.

    import {createStore} from 'tinybase';
    
    const store = createStore();
    

Easy enough! The returned [`Store`](/api/store/interfaces/store/store/) starts off empty of course:

    console.log(store.getValues());
    // -> {}
    
    console.log(store.getTables());
    // -> {}
    

To fix that, let's move onto the [Writing To Stores](/guides/the-basics/writing-to-stores/) guide.

---

## Page: https://beta.tinybase.org/guides/the-basics/writing-to-stores/

*   [TinyBase](/)
*   [Guides](/guides/)
*   [The Basics](/guides/the-basics/)
*   [Writing To Stores](/guides/the-basics/writing-to-stores/)

Writing To Stores
=================

This guide shows you how to write data to a [`Store`](/api/store/interfaces/store/store/).

A [`Store`](/api/store/interfaces/store/store/) has two types of data in it: keyed values ('[`Values`](/api/store/type-aliases/store/values/)'), and tabular data ('[`Tables`](/api/store/type-aliases/store/tables/)').

[`Values`](/api/store/type-aliases/store/values/) are just [`Id`](/api/common/type-aliases/identity/id/)/[`Value`](/api/store/type-aliases/store/value/) pairs. [`Tables`](/api/store/type-aliases/store/tables/) on the other hand, have a simple hierarchical structure:

*   The [`Store`](/api/store/interfaces/store/store/)'s [`Tables`](/api/store/type-aliases/store/tables/) object contains a number of [`Table`](/api/store/type-aliases/store/table/) objects.
*   Each [`Table`](/api/store/type-aliases/store/table/) contains a number of [`Row`](/api/store/type-aliases/store/row/) objects.
*   Each [`Row`](/api/store/type-aliases/store/row/) contains a number of [`Cell`](/api/store/type-aliases/store/cell/) objects.

Once you have created a [`Store`](/api/store/interfaces/store/store/), you can write data to it with one of its setter methods, according to the level of the hierarchy that you want to set.

For example, you can set the data for the keyed value structure of [`Store`](/api/store/interfaces/store/store/) with the [`setValues`](/api/store/interfaces/store/store/methods/setter/setvalues/) method:

    import {createStore} from 'tinybase';
    
    const store = createStore();
    store.setValues({employees: 3, open: true});
    

Similarly, you can set the data for the tabular structure of [`Store`](/api/store/interfaces/store/store/) with the [`setTables`](/api/store/interfaces/store/store/methods/setter/settables/) method:

    store.setTables({pets: {fido: {species: 'dog'}}});
    

Hopefully self-evidently, this sets the [`Store`](/api/store/interfaces/store/store/) to have two [`Values`](/api/store/type-aliases/store/values/) (`employees` and `open`, which are `3` and `true` respectively). It also has one [`Table`](/api/store/type-aliases/store/table/) object (called `pets`), containing one [`Row`](/api/store/type-aliases/store/row/) object (called `fido`), containing one [`Cell`](/api/store/type-aliases/store/cell/) object (called `species` and with the string value `dog`):

    console.log(store.getValues());
    // -> {employees: 3, open: true}
    
    console.log(store.getTables());
    // -> {pets: {fido: {species: 'dog'}}}
    

You can also alter [`Store`](/api/store/interfaces/store/store/) data at different granularities with the [`setValue`](/api/store/interfaces/store/store/methods/setter/setvalue/) method, the [`setTable`](/api/store/interfaces/store/store/methods/setter/settable/) method, the [`setRow`](/api/store/interfaces/store/store/methods/setter/setrow/) method, and the [`setCell`](/api/store/interfaces/store/store/methods/setter/setcell/) method:

    store.setValue('employees', 4);
    console.log(store.getValues());
    // -> {employees: 4, open: true}
    
    store.setTable('species', {dog: {price: 5}});
    console.log(store.getTables());
    // -> {pets: {fido: {species: 'dog'}}, species: {dog: {price: 5}}}
    
    store.setRow('species', 'cat', {price: 4});
    console.log(store.getTables());
    // -> {pets: {fido: {species: 'dog'}}, species: {dog: {price: 5}, cat: {price: 4}}}
    
    store.setCell('pets', 'fido', 'color', 'brown');
    console.log(store.getTables());
    // -> {pets: {fido: {species: 'dog', color: 'brown'}}, species: {dog: {price: 5}, cat: {price: 4}}}
    

The data in a [`Value`](/api/store/type-aliases/store/value/) or a [`Cell`](/api/store/type-aliases/store/cell/) can be a string, a number, or a boolean type.

It's worth mentioning here that there are two extra methods to manipulate [`Row`](/api/store/type-aliases/store/row/) objects. The [`addRow`](/api/store/interfaces/store/store/methods/setter/addrow/) method is like the [`setRow`](/api/store/interfaces/store/store/methods/setter/setrow/) method but automatically assigns it a new unique [`Id`](/api/common/type-aliases/identity/id/). And the [`setPartialRow`](/api/store/interfaces/store/store/methods/setter/setpartialrow/) method lets you update multiple [`Cell`](/api/store/type-aliases/store/cell/) values in a [`Row`](/api/store/type-aliases/store/row/) without affecting the others. (setPartialValues does the same for [`Values`](/api/store/type-aliases/store/values/).)

### Deleting Data

There are dedicated deletion methods (again, for each level of granularity), such as the [`delValue`](/api/store/interfaces/store/store/methods/deleter/delvalue/) method, the [`delTable`](/api/store/interfaces/store/store/methods/deleter/deltable/) method, the [`delRow`](/api/store/interfaces/store/store/methods/deleter/delrow/) method, and the [`delCell`](/api/store/interfaces/store/store/methods/deleter/delcell/) method. For example:

    store.delValue('employees');
    console.log(store.getValues());
    // -> {open: true}
    
    store.delTable('species');
    console.log(store.getTables());
    // -> {pets: {fido: {species: 'dog', color: 'brown'}}}
    

Deletions are also implied when you set an object that omits something that existed before:

    console.log(store.getTables());
    // -> {pets: {fido: {species: 'dog', color: 'brown'}}}
    
    store.setRow('pets', 'fido', {species: 'dog'});
    console.log(store.getTables());
    // -> {pets: {fido: {species: 'dog'}}}
    // The `color` Cell has been deleted.
    

[`Table`](/api/store/type-aliases/store/table/) and [`Row`](/api/store/type-aliases/store/row/) objects cannot be empty - if they are, they are removed - which leads to a cascading effect when you remove the final child of a parent object:

    store.delCell('pets', 'fido', 'species');
    console.log(store.getTables());
    // -> {}
    // The `fido` Row and `pets` Table have been recursively deleted.
    

### Summary

That's a quick overview on how to write data to a [`Store`](/api/store/interfaces/store/store/). But of course you want to get it out again too!

In the examples above, we've used the [`getValues`](/api/store/interfaces/store/store/methods/getter/getvalues/) method and the [`getTables`](/api/store/interfaces/store/store/methods/getter/gettables/) method to get a view into the data in the [`Store`](/api/store/interfaces/store/store/). Unsurprisingly, you can also use more granular methods to get data out - for which we proceed to the [Reading From Stores](/guides/the-basics/reading-from-stores/) guide.

---

## Page: https://beta.tinybase.org/guides/the-basics/reading-from-stores/

*   [TinyBase](/)
*   [Guides](/guides/)
*   [The Basics](/guides/the-basics/)
*   [Reading From Stores](/guides/the-basics/reading-from-stores/)

Reading From Stores
===================

This guide shows you how to read data from a [`Store`](/api/store/interfaces/store/store/).

While we're here, notice how the the [`createStore`](/api/store/functions/creation/createstore/) function and setter methods return the [`Store`](/api/store/interfaces/store/store/) again, so we can easily instantiate it by chaining methods together:

    import {createStore} from 'tinybase';
    
    const store = createStore()
      .setValues({employees: 3, open: true})
      .setTables({
        pets: {fido: {species: 'dog'}},
        species: {dog: {price: 5}},
      });
    

To get the data out again, according to the level of the hierarchy that you want to get data for, you can use the [`getValues`](/api/store/interfaces/store/store/methods/getter/getvalues/) method, the [`getValue`](/api/store/interfaces/store/store/methods/getter/getvalue/) method, the [`getTables`](/api/store/interfaces/store/store/methods/getter/gettables/) method, the [`getTable`](/api/store/interfaces/store/store/methods/getter/gettable/) method, the [`getRow`](/api/store/interfaces/store/store/methods/getter/getrow/) method, or the [`getCell`](/api/store/interfaces/store/store/methods/getter/getcell/) method.

By now, this should be starting to look intuitive. (I hope so! If not, let me know!)

    console.log(store.getValues());
    // -> {employees: 3, open: true}
    
    console.log(store.getValue('employees'));
    // -> 3
    
    console.log(store.getTables());
    // -> {pets: {fido: {species: 'dog'}}, species: {dog: {price: 5}}}
    
    console.log(store.getTable('pets'));
    // -> {fido: {species: 'dog'}}
    
    console.log(store.getRow('pets', 'fido'));
    // -> {species: 'dog'}
    
    console.log(store.getCell('pets', 'fido', 'species'));
    // -> 'dog'
    

It is worth noting that the return types of these methods are by value, not by reference. So if you manipulate the returned object, the [`Store`](/api/store/interfaces/store/store/) is not updated:

    const fido = store.getRow('pets', 'fido');
    fido.color = 'brown';
    console.log(fido);
    // -> {species: 'dog', color: 'brown'}
    
    console.log(store.getRow('pets', 'fido'));
    // -> {species: 'dog'}
    

### Handling Non-Existent Data

The [`hasValue`](/api/store/interfaces/store/store/methods/getter/hasvalue/) method, the [`hasTable`](/api/store/interfaces/store/store/methods/getter/hastable/) method, the [`hasRow`](/api/store/interfaces/store/store/methods/getter/hasrow/) method, and the [`hasCell`](/api/store/interfaces/store/store/methods/getter/hascell/) method can be used to see whether a given object exists, without having to read it:

    console.log(store.hasValue('website'));
    // -> false
    
    console.log(store.hasTable('customers'));
    // -> false
    
    console.log(store.hasRow('pets', 'fido'));
    // -> true
    

When you try to access something that doesn't exist, you'll receive an `undefined` value for a [`Value`](/api/store/type-aliases/store/value/) or [`Cell`](/api/store/type-aliases/store/cell/), or an empty object:

    console.log(store.getValue('website'));
    // -> undefined
    
    console.log(store.getTable('customers'));
    // -> {}
    
    console.log(store.getRow('pets', 'felix'));
    // -> {}
    
    console.log(store.getCell('pets', 'fido', 'color'));
    // -> undefined
    

### Enumerating [`Ids`](/api/common/type-aliases/identity/ids/)

A [`Store`](/api/store/interfaces/store/store/) contains [`Value`](/api/store/type-aliases/store/value/) and [`Table`](/api/store/type-aliases/store/table/) objects, keyed by [`Id`](/api/common/type-aliases/identity/id/). A [`Table`](/api/store/type-aliases/store/table/) contains [`Row`](/api/store/type-aliases/store/row/) objects, keyed by [`Id`](/api/common/type-aliases/identity/id/). And a [`Row`](/api/store/type-aliases/store/row/) contains [`Cell`](/api/store/type-aliases/store/cell/) objects, keyed by [`Id`](/api/common/type-aliases/identity/id/).

You can enumerate the [`Id`](/api/common/type-aliases/identity/id/) keys for each with the [`getValueIds`](/api/store/interfaces/store/store/methods/getter/getvalueids/) method, the [`getTableIds`](/api/store/interfaces/store/store/methods/getter/gettableids/) method, the [`getRowIds`](/api/store/interfaces/store/store/methods/getter/getrowids/) method, or the [`getCellIds`](/api/store/interfaces/store/store/methods/getter/getcellids/) method - each of which return arrays:

    console.log(store.getValueIds());
    // -> ['employees', 'open']
    
    console.log(store.getTableIds());
    // -> ['pets', 'species']
    
    console.log(store.getRowIds('pets'));
    // -> ['fido']
    
    console.log(store.getCellIds('pets', 'fido'));
    // -> ['species']
    

There is also the [`getSortedRowIds`](/api/store/interfaces/store/store/methods/getter/getsortedrowids/) method that lets you get the [`Ids`](/api/common/type-aliases/identity/ids/) sorted by a specific [`Cell`](/api/store/type-aliases/store/cell/) [`Id`](/api/common/type-aliases/identity/id/), and the [`getTableCellIds`](/api/store/interfaces/store/store/methods/getter/gettablecellids/) method that lets you get all the [`Ids`](/api/common/type-aliases/identity/ids/) used across a whole [`Table`](/api/store/type-aliases/store/table/).

Again, the return types of these methods are by value, not by reference. So if you manipulate the returned array, the [`Store`](/api/store/interfaces/store/store/) is not updated:

    const tableIds = store.getTableIds();
    tableIds.pop();
    console.log(tableIds);
    // -> ['pets']
    
    console.log(store.getTableIds());
    // -> ['pets', 'species']
    

Finally, the [`forEachValue`](/api/store/interfaces/store/store/methods/iterator/foreachvalue/) method, the [`forEachTable`](/api/store/interfaces/store/store/methods/iterator/foreachtable/) method, the [`forEachRow`](/api/store/interfaces/store/store/methods/iterator/foreachrow/) method, and the [`forEachCell`](/api/store/interfaces/store/store/methods/iterator/foreachcell/) method each provide a convenient way to iterate over these objects and their children in turn:

    store.forEachTable((tableId, forEachRow) => {
      console.log(tableId);
      forEachRow((rowId) => console.log(`- ${rowId}`));
    });
    // -> 'pets'
    // -> '- fido'
    // -> 'species'
    // -> '- dog'
    

### Summary

So far, this should seem relatively straightforward. For more information on all of these methods, you'll find a lot more in the [`Store`](/api/store/interfaces/store/store/) documentation.

The reactive TinyBase magic starts to happen when we register listeners on the [`Store`](/api/store/interfaces/store/store/) so we don't have to keep explicitly fetching data.

For that, we proceed to the [Listening To Stores](/guides/the-basics/listening-to-stores/) guide.

---

## Page: https://beta.tinybase.org/guides/the-basics/listening-to-stores/

*   [TinyBase](/)
*   [Guides](/guides/)
*   [The Basics](/guides/the-basics/)
*   [Listening To Stores](/guides/the-basics/listening-to-stores/)

Listening To Stores
===================

This guide shows you how to listen to changes in the data in a [`Store`](/api/store/interfaces/store/store/).

By now, you'll have noticed that there are always consistent methods for each level of the [`Store`](/api/store/interfaces/store/store/) hierarchy, and the way you register listeners is no exception:

*   Listen to [`Values`](/api/store/type-aliases/store/values/) with the [`addValuesListener`](/api/store/interfaces/store/store/methods/listener/addvalueslistener/) method.
*   Listen to [`Value`](/api/store/type-aliases/store/value/) [`Ids`](/api/common/type-aliases/identity/ids/) with the [`addValueIdsListener`](/api/store/interfaces/store/store/methods/listener/addvalueidslistener/) method.
*   Listen to a [`Value`](/api/store/type-aliases/store/value/) with the [`addValueListener`](/api/store/interfaces/store/store/methods/listener/addvaluelistener/) method.

And for tabular data:

*   Listen to [`Tables`](/api/store/type-aliases/store/tables/) with the [`addTablesListener`](/api/store/interfaces/store/store/methods/listener/addtableslistener/) method.
*   Listen to [`Table`](/api/store/type-aliases/store/table/) [`Ids`](/api/common/type-aliases/identity/ids/) with the [`addTableIdsListener`](/api/store/interfaces/store/store/methods/listener/addtableidslistener/) method.
*   Listen to a [`Table`](/api/store/type-aliases/store/table/) with the [`addTableListener`](/api/store/interfaces/store/store/methods/listener/addtablelistener/) method.
*   Listen to Cells [`Ids`](/api/common/type-aliases/identity/ids/) across a [`Table`](/api/store/type-aliases/store/table/) with the [`addTableCellIdsListener`](/api/store/interfaces/store/store/methods/listener/addtablecellidslistener/) method.
*   Listen to [`Row`](/api/store/type-aliases/store/row/) [`Ids`](/api/common/type-aliases/identity/ids/) with the [`addRowIdsListener`](/api/store/interfaces/store/store/methods/listener/addrowidslistener/) method.
*   Listen to sorted [`Row`](/api/store/type-aliases/store/row/) [`Ids`](/api/common/type-aliases/identity/ids/) with the [`addSortedRowIdsListener`](/api/store/interfaces/store/store/methods/listener/addsortedrowidslistener/) method.
*   Listen to a [`Row`](/api/store/type-aliases/store/row/) with the [`addRowListener`](/api/store/interfaces/store/store/methods/listener/addrowlistener/) method.
*   Listen to [`Cell`](/api/store/type-aliases/store/cell/) [`Ids`](/api/common/type-aliases/identity/ids/) with the [`addCellIdsListener`](/api/store/interfaces/store/store/methods/listener/addcellidslistener/) method.
*   Listen to a [`Cell`](/api/store/type-aliases/store/cell/) with the [`addCellListener`](/api/store/interfaces/store/store/methods/listener/addcelllistener/) method.

You can also listen to attempts to write invalid data to a [`Value`](/api/store/type-aliases/store/value/) with the [`addInvalidValueListener`](/api/store/interfaces/store/store/methods/listener/addinvalidvaluelistener/) method, and to a [`Cell`](/api/store/type-aliases/store/cell/) with the [`addInvalidCellListener`](/api/store/interfaces/store/store/methods/listener/addinvalidcelllistener/) method.

Let's start with the simplest type of listener, addTablesListener, which listens to changes to any tabular data in the [`Store`](/api/store/interfaces/store/store/). Firstly, let's set up some simple data:

    import {createStore} from 'tinybase';
    
    const store = createStore().setTables({
      pets: {fido: {species: 'dog'}},
      species: {dog: {price: 5}},
    });
    

We can then use the [`addTablesListener`](/api/store/interfaces/store/store/methods/listener/addtableslistener/) method to register a function on the [`Store`](/api/store/interfaces/store/store/) that will be called whenever the data in the [`Store`](/api/store/interfaces/store/store/) changes:

    const listenerId = store.addTablesListener(() =>
      console.log('Tables changed!'),
    );
    

Let's test it out by updating a [`Cell`](/api/store/type-aliases/store/cell/) in the [`Store`](/api/store/interfaces/store/store/):

    store.setCell('species', 'dog', 'price', 6);
    // -> 'Tables changed!'
    

The listener will be called, regardless of which type of setter method was used to make the change. But a change needs to have been made! If a setter method was used to no effect, the listener is not called:

    store.setCell('pets', 'fido', 'species', 'dog');
    // Since the data didn't actually change, the listener was not called.
    

It is important to note that by default, you can't mutate the [`Store`](/api/store/interfaces/store/store/) with code inside a listener, and attempting to do so will fail silently. We cover how to mutate the [`Store`](/api/store/interfaces/store/store/) from with in a listener (in order to adhere to a [`TablesSchema`](/api/store/type-aliases/schema/tablesschema/), for example) in the [Mutating Data With Listeners](/guides/schemas/mutating-data-with-listeners/) guide.

### Cleaning Up Listeners

You will have noticed that the [`addTablesListener`](/api/store/interfaces/store/store/methods/listener/addtableslistener/) method didn't return a reference to the [`Store`](/api/store/interfaces/store/store/) object (so you can't chain other methods after it), but an [`Id`](/api/common/type-aliases/identity/id/) representing the registration of that listener.

You can use that [`Id`](/api/common/type-aliases/identity/id/) to remove the listener at a later stage with the [`delListener`](/api/store/interfaces/store/store/methods/listener/dellistener/) method:

    store.delListener(listenerId);
    store.setCell('species', 'dog', 'price', 7);
    // Listener has been unregistered and so is not called.
    

It's good habit to remove the listeners you are no longer using. Note that listener [`Ids`](/api/common/type-aliases/identity/ids/) are commonly re-used, so you have removed a listener with a given [`Id`](/api/common/type-aliases/identity/id/), don't try to use that [`Id`](/api/common/type-aliases/identity/id/) again.

### Listener Parameters

In the example above, we registered a listener that didn't take any parameters. However, all [`Store`](/api/store/interfaces/store/store/) listeners are called with at least a reference to the [`Store`](/api/store/interfaces/store/store/), and often a convenient `getCellChange` function that lets you inspect changes that might have happened:

    const listenerId2 = store.addTablesListener((store, getCellChange) =>
      console.log(getCellChange('species', 'dog', 'price')),
    );
    
    store.setCell('species', 'dog', 'price', 8);
    // -> [true, 7, 8]
    
    store.delListener(listenerId2);
    

See the [`addTablesListener`](/api/store/interfaces/store/store/methods/listener/addtableslistener/) method documentation for more information on these parameters.

When you listen to changes down inside a [`Store`](/api/store/interfaces/store/store/) (with more granular listeners), you will also be passed [`Id`](/api/common/type-aliases/identity/id/) parameters reflecting what changed.

For example, here we register a listener on the `fido` [`Row`](/api/store/type-aliases/store/row/) in the `pets` [`Table`](/api/store/type-aliases/store/table/):

    const listenerId3 = store.addRowListener(
      'pets',
      'fido',
      (store, tableId, rowId) =>
        console.log(`${rowId} row in ${tableId} table changed`),
    );
    
    store.setCell('pets', 'fido', 'color', 'brown');
    // -> 'fido row in pets table changed'
    
    store.delListener(listenerId3);
    

When you register a [`CellListener`](/api/store/type-aliases/listener/celllistener/) listener with the [`addCellListener`](/api/store/interfaces/store/store/methods/listener/addcelllistener/) method, that also receives parameters containing the old and new [`Cell`](/api/store/type-aliases/store/cell/) values.

### Wildcard Listeners

The fact that the listeners are passed parameters for what changed becomes very useful when you register wildcard listeners. These listen to changes at a particular part of the [`Store`](/api/store/interfaces/store/store/) hierarchy but not necessarily to a specific object.

So for example, you can listen to changes to any [`Row`](/api/store/type-aliases/store/row/) in a given [`Table`](/api/store/type-aliases/store/table/). To wildcard what you want to listen to, simply use `null` in place of an [`Id`](/api/common/type-aliases/identity/id/) argument when you add a listener:

    const listenerId4 = store.addRowListener(null, null, (store, tableId, rowId) =>
      console.log(`${rowId} row in ${tableId} table changed`),
    );
    
    store.setCell('pets', 'fido', 'color', 'walnut');
    // -> 'fido row in pets table changed'
    
    store.setCell('species', 'dog', 'price', '9');
    // -> 'dog row in species table changed'
    
    store.delListener(listenerId4);
    

You can intermingle wildcards and actual [`Id`](/api/common/type-aliases/identity/id/) values for any of the parameters. So, for example, you could listen to the [`Cell`](/api/store/type-aliases/store/cell/) values with a given [`Id`](/api/common/type-aliases/identity/id/) in any [`Row`](/api/store/type-aliases/store/row/) in a given [`Table`](/api/store/type-aliases/store/table/), and so on.

Note that you can't use the wildcard technique with the [`addSortedRowIdsListener`](/api/store/interfaces/store/store/methods/listener/addsortedrowidslistener/) method. You must explicitly specify just one [`Table`](/api/store/type-aliases/store/table/), for performance reasons.

### Summary

We've now seen how to create a [`Store`](/api/store/interfaces/store/store/), set data in it, read it back out, and set up listeners to detect whenever it changes. Finally we'll cover how to wrap multiple changes together, in the [Transactions](/guides/the-basics/transactions/) guide.

---

## Page: https://beta.tinybase.org/guides/the-basics/transactions/

*   [TinyBase](/)
*   [Guides](/guides/)
*   [The Basics](/guides/the-basics/)
*   [Transactions](/guides/the-basics/transactions/)

Transactions
============

This guide shows you how to wrap multiple changes to the data in a [`Store`](/api/store/interfaces/store/store/).

A transaction is a sequence of changes made to a [`Store`](/api/store/interfaces/store/store/). No listeners will be fired until the full transaction is complete. This is a useful way to debounce listener side-effects and ensure that you are only responding to net changes. [`Changes`](/api/store/type-aliases/transaction/changes/) are made silently during the transaction, and listeners relevant to the changes you have made will instead only be called when the whole transaction is complete.

A transaction can also be rolled back and the original state of the [`Store`](/api/store/interfaces/store/store/) will be restored.

### Creating Transactions

The [`transaction`](/api/store/interfaces/store/store/methods/transaction/transaction/) method takes a function that makes multiple mutations to the store, buffering all calls to the relevant listeners until it completes.

    import {createStore} from 'tinybase';
    
    const store = createStore().setTables({pets: {fido: {species: 'dog'}}});
    const listenerId = store.addRowListener('pets', 'fido', () =>
      console.log('Fido changed'),
    );
    
    // Multiple changes, not in a transaction
    store.setCell('pets', 'fido', 'color', 'brown');
    store.setCell('pets', 'fido', 'sold', false);
    // -> 'Fido changed'
    // -> 'Fido changed'
    
    // Multiple changes in a transaction
    store.transaction(() => {
      store.setCell('pets', 'fido', 'color', 'walnut');
      store.setCell('pets', 'fido', 'sold', true);
    });
    // -> 'Fido changed'
    
    store.delListener(listenerId);
    

If multiple changes are made to a piece of [`Store`](/api/store/interfaces/store/store/) data throughout the transaction, a relevant listener will only be called with the final value (assuming it is different to the value at the start of the transaction), regardless of the changes that happened in between. For example, if a [`Cell`](/api/store/type-aliases/store/cell/) had a value `'a'` and then, within a transaction, it was changed to `'b'` and then `'c'`, any [`CellListener`](/api/store/type-aliases/listener/celllistener/) registered for that cell would be called once as if there had been a single change from `'a'` to `'c'`:

    const listenerId2 = store.addCellListener(
      'pets',
      'fido',
      'color',
      (store, tableId, rowId, cellId, newCell) =>
        console.log(`Fido color changed to ${newCell}`),
    );
    
    store.transaction(() => {
      store.setCell('pets', 'fido', 'color', 'black');
      store.setCell('pets', 'fido', 'color', 'brown');
    });
    // -> 'Fido color changed to brown'
    
    store.delListener(listenerId2);
    

Note that transactions can be nested. Relevant listeners will be called only when the outermost one completes.

### Rolling Back Transactions

The [`transaction`](/api/store/interfaces/store/store/methods/transaction/transaction/) method takes a second optional parameter, `doRollback`. This is a callback that you can use to rollback the transaction if it did not complete to your satisfaction.

This example makes multiple changes to the [`Store`](/api/store/interfaces/store/store/), including some attempts to update a [`Cell`](/api/store/type-aliases/store/cell/) with invalid values. The `doRollback` callback fetches information about the changes and invalid attempts, and then judges that the transaction should be rolled back to its original state.

    store.transaction(
      () => {
        store.setCell('pets', 'fido', 'color', 'black');
        store.setCell('pets', 'fido', 'eyes', ['left', 'right']);
        store.setCell('pets', 'fido', 'buyer', {name: 'Bob'});
      },
      () => {
        const [, , changedCells, invalidCells] = store.getTransactionLog();
        console.log(store.getTables());
        // -> {pets: {fido: {species: 'dog', color: 'black', sold: true}}}
        console.log(changedCells);
        // -> {pets: {fido: {color: ['brown', 'black']}}}
        console.log(invalidCells);
        // -> {pets: {fido: {eyes: [['left', 'right']], buyer: [{name: 'Bob'}]}}}
        return invalidCells['pets'] != null;
      },
    );
    
    console.log(store.getTables());
    // -> {pets: {fido: {species: 'dog', color: 'brown', sold: true}}}
    

### Listening to transactions

You can register listeners to the start and finish of a transaction. There are three points in its lifecycle:

Event

Add a listener with

When

Can mutate data

Start

[`addStartTransactionListener`](/api/store/interfaces/store/store/methods/listener/addstarttransactionlistener/)

Before changes

Yes

WillFinish

[`addWillFinishTransactionListener`](/api/store/interfaces/store/store/methods/listener/addwillfinishtransactionlistener/)

After changes and other mutator listeners

Yes

DidFinish

[`addDidFinishTransactionListener`](/api/store/interfaces/store/store/methods/listener/adddidfinishtransactionlistener/)

After non-mutator listeners

No

For example:

    store.delTables();
    
    const startListenerId = store.addStartTransactionListener(() => {
      console.log('Start transaction');
      console.log(store.getTables());
      // Can mutate data
    });
    
    const willFinishListenerId = store.addWillFinishTransactionListener(() => {
      console.log('Will finish transaction');
      console.log(store.getTables());
      // Can mutate data
    });
    
    const didFinishListenerId = store.addDidFinishTransactionListener(() => {
      console.log('Did finish transaction');
      console.log(store.getTables());
      // Cannot mutate data
    });
    
    store.setTable('pets', {fido: {species: 'dog'}});
    // -> 'Start transaction'
    // -> {}
    // -> 'Will finish transaction'
    // -> {pets: {fido: {species: 'dog'}}}
    // -> 'Did finish transaction'
    // -> {pets: {fido: {species: 'dog'}}}
    
    store
      .delListener(startListenerId)
      .delListener(willFinishListenerId)
      .delListener(didFinishListenerId);
    

### Summary

We've covered all of the essential basics of working with a TinyBase [`Store`](/api/store/interfaces/store/store/), but that's still just the start!

Before we move on, we have a quick aside about how to use various flavors of TinyBase in your app, in the [Importing TinyBase](/guides/the-basics/importing-tinybase/) guide.

---

## Page: https://beta.tinybase.org/guides/the-basics/importing-tinybase/

*   [TinyBase](/)
*   [Guides](/guides/)
*   [The Basics](/guides/the-basics/)
*   [Importing TinyBase](/guides/the-basics/importing-tinybase/)

Importing TinyBase
==================

This guide provides an aside about importing TinyBase into your application.

### The Simplest Imports

The simplest import of TinyBase is:

    import {createMetrics, createStore} from 'tinybase';
    

This will get you an ESNext, ESM, non-minified import of the main `tinybase` module, (which contains most of the core functionality), and should be enough to get started. You may also want to import specific persister, synchronizer, or UI modules:

    import {createSessionPersister} from 'tinybase/persisters/persister-browser';
    import {createWsSynchronizer} from 'tinybase/synchronizers/synchronizer-ws-client';
    import {useCell} from 'tinybase/ui-react';
    import {TableInHtmlTable} from 'tinybase/ui-react-dom';
    
    // ... etc
    

All the example code throughout these guides and the API documentation are shown with the correct imports so that you can be clear about which functions and types come from which modules.

### Using TinyBase Submodules

The `tinybase` module is the master package of most of the core functionality. It includes the following submodules:

*   The [`store`](/api/store/) module
*   The [`metrics`](/api/metrics/) module
*   The [`indexes`](/api/indexes/) module
*   The [`relationships`](/api/relationships/) module
*   The [`queries`](/api/queries/) module
*   The [`checkpoints`](/api/checkpoints/) module
*   The [`mergeable-store`](/api/mergeable-store/) module
*   The [`common`](/api/common/) module

Since many of the submodules above share compiled-in dependencies, the master package is smaller to include than including all of the submodules separately.

However, for a very minimal set of submodules, you may save size by including them piecemeal. If you only wanted a [`Store`](/api/store/interfaces/store/store/) and a [`Metrics`](/api/metrics/interfaces/metrics/metrics/) object, for example, you could import them alone like this:

    import {createMetrics} from 'tinybase/metrics';
    import {createStore} from 'tinybase/store';
    
    // ...
    

With a good minifier in your application bundler, however, you may find that this level of granularity is unnecessary, and that you can just stick with the overall `tinybase` module for most things.

The submodules for various [`Persister`](/api/persisters/interfaces/persister/persister/) and [`Synchronizer`](/api/synchronizers/interfaces/synchronizer/synchronizer/) types are _not_ included in the main tinybase module, but should be imported separately from inside the `persisters` and `synchronizers` folders. See the [Persistence](/guides/persistence/) and [Synchronization](/guides/synchronization/) guides, respectively, for more details.

### Targets And Formats

Prior to TinyBase v6.0, the NPM package included a number of different versions of each module, transpiled for different targets and formats. From v6.0 onwards, only ESNext, ESM modules are included in the main package.

However, both non-minified and minified versions are available: the default is non-minified code, but minified versions are available in the top-level `min` folder:

    import {createStore} from 'tinybase'; // non-minified
    // or
    import {createStore} from 'tinybase/min'; // minified
    

### Indicating Schema-based Typing

As we will see in more details in the following [TinyBase And TypeScript](/guides/the-basics/tinybase-and-typescript/) guide, it is possible to use schema-aware type definitions by appending `with-schemas` to the very end of the path like this:

    import {createStore} from 'tinybase/with-schemas';
    
    // NB the 'with-schemas'
    

### Putting It All Together

As long as you put the optional parts of the path in the right order, you can access all the valid combinations of minification, sub-module and schema support. The syntax for the import (split onto different lines for clarity) is:

    tinybase
      [ /min ]
        [ /store | /metrics | /queries | ... ]
          [ /with-schemas ]
    

For example, this is a non-exhaustive list of options that are all valid:

Import

Minified

Sub-module

With schemas

`import {...} from 'tinybase';`

no

no

`import {...} from 'tinybase/with-schemas';`

no

yes

`import {...} from 'tinybase/min';`

yes

no

`import {...} from 'tinybase/store/with-schemas'`

no

[`store`](/api/store/)

no

`import {...} from 'tinybase/min/store/with-schemas'`

yes

[`store`](/api/store/)

yes

...

If all else fails, take a look into the package folder and see what's what!

### React Native

If you are using [React Native](https://reactnative.dev/) - for example with [Expo](https://expo.dev/) - be aware that the [Metro](https://facebook.github.io/metro/) bundler does not currently support module resolution very well. You may have to add in the exact file path to be explicit about your imports:

    import {createStore} from 'tinybase/index.js';
    import {useCell} from 'tinybase/ui-react/index.js';
    

This situation is evolving however, so you may find these extra file names unnecessary as bundler support improves.

Check out the [Expo TinyBase example](https://github.com/expo/examples/tree/master/with-tinybase) for a simple working template to get started with TinyBase and React Native.

### ESlint Resolver Issues

There is a [known issue](https://github.com/import-js/eslint-plugin-import/issues/1810) with the `no-unresolved` ESlint rule whereby it does not understand the `exports` section of the TinyBase `package.json`. You may wish to disable that rule if you are getting false positives using TinyBase submodules.

### Enough!

OK, we're done with the `import` shenanigans. Let's briefly look at how TinyBase benefits from using TypeScript to improve your developer experience in the TinyBase and TypeScript guide.

---

## Page: https://beta.tinybase.org/guides/the-basics/tinybase-and-typescript/

*   [TinyBase](/)
*   [Guides](/guides/)
*   [The Basics](/guides/the-basics/)
*   [TinyBase And TypeScript](/guides/the-basics/tinybase-and-typescript/)

TinyBase And TypeScript
=======================

This guide summarizes the two different levels of TypeScript coverage you can use with TinyBase.

### 1\. Basic Type Support

Out of the box, TinyBase has complete type coverage for all of its modules. So for example, setting and getting tabular and key-value data will obey the system's constraints. A [`Cell`](/api/store/type-aliases/store/cell/) or a [`Value`](/api/store/type-aliases/store/value/) can only be a number, string, or boolean, for example:

    import {createStore} from 'tinybase';
    
    const store = createStore();
    
    store.setValues({employees: 3}); //                OK
    store.setValues({employees: true}); //             OK
    store.setValues({employees: ['Alice', 'Bob']}); // TypeScript error
    

This basic typing of the API is comprehensively described throughout in the API documentation.

### 2\. Schema-based Typing

The next step up is when you provide a schema for your TinyBase data. This more tightly constrains the types of [`Table`](/api/store/type-aliases/store/table/), [`Cell`](/api/store/type-aliases/store/cell/), and [`Value`](/api/store/type-aliases/store/value/) that your [`Store`](/api/store/interfaces/store/store/) can contain.

Since v3.1, TinyBase can provide typing that adapts according to the schema when you import the `with-schemas` version of the library. For example:

    import {createStore} from 'tinybase/with-schemas';
    
    // NB the 'with-schemas'
    
    const store = createStore().setValuesSchema({
      employees: {type: 'number'},
      open: {type: 'boolean', default: false},
    });
    
    store.setValues({employees: 3}); //                      OK
    store.setValues({employees: true}); //                   TypeScript error
    store.setValues({employees: 3, website: 'pets.com'}); // TypeScript error
    

(The separate import is provided because the schema-based autocomplete and errors can be fairly verbose and confusing when you only need the basic type support.)

Read more about this technique in the [Schema-Based Typing](/guides/schemas/schema-based-typing/) guide.

### Summary

TinyBase provides different levels of typed support for your data, depending on how prescriptive you want it to be and your personal preferences.

Next we will run through some of the many ways you can build your app around TinyBase in the [Architectural Options](/guides/the-basics/architectural-options/) guide.

---

## Page: https://beta.tinybase.org/guides/the-basics/architectural-options/

*   [TinyBase](/)
*   [Guides](/guides/)
*   [The Basics](/guides/the-basics/)
*   [Architectural Options](/guides/the-basics/architectural-options/)

Architectural Options
=====================

This guide discusses some of the ways in which you can use TinyBase, and how you can architect it into the bigger picture of how your app is built.

Before we go any further, remember that TinyBase is an in-memory data store that runs within a JavaScript environment like a browser or a worker. Whilst it can theoretically stand alone in a simple app, you'll probably want to preserve, share, or sync the data between reloads and sessions.

Here are the options we'll discuss in this guide:

*   [Standalone TinyBase](#0-standalone-tinybase)
*   [Read-Only Cloud Data](#1-read-only-cloud-data)
*   [Browser Storage](#2-browser-storage)
*   [Client Database Storage](#3-client-database-storage)
*   [Client-Only Synchronization](#4-client-only-synchronization)
*   [Client-Server Synchronization](#5-client-server-synchronization)
*   [Third-Party Synchronization](#6-third-party-synchronization)

As you can see lot of what we'll be discussing is how to integrate TinyBase with different persistence and synchronization techniques - whether on the client or the server, or both. Let's go!

### 0\. Standalone TinyBase

In this option, a TinyBase [`Store`](/api/store/interfaces/store/store/) is instantiated when the app runs. During its use, data is added or updated, and rendered accordingly. When the app is reloaded or closed, the data is lost.

*   **Pros**: This is very simple to set up, and good for prototyping small apps.
*   **Cons**: It's a transient experience and your users' data won't show up again if they refresh their browser, revisit the app later.

The [Todo App v1 (the basics)](/demos/todo-app/todo-app-v1-the-basics/) demo is a good example of how to get started with an app like this.

### 1\. Read-Only Cloud Data

As one way to enhance the standalone app option, you can use the TinyBase persistence framework to load data from a server when the app starts, and then store it in a [`Store`](/api/store/interfaces/store/store/). This might be appropriate for an app that uses read-only structured data which is small enough to fit into memory (and fast enough to load at start up).

*   **Pros**: This is also relatively simple to set up, and good for data-centric or reference apps.
*   **Cons**: The data is not interactive (or at least, changes made locally will not be saved). At some point, the size of the data needed might start to challenge the browser's memory - or the time you are prepared to let the startup spinner run for! - after which local persistence and pagination might be preferable.

The [Movie Database](/demos/movie-database/) demo, the [Word Frequencies](/demos/word-frequencies/) demo, the [Car Analysis](/demos/car-analysis/) demo, and the [City Database](/demos/city-database/) demo are all good examples of this sort of 'read-only' app, each exercising different aspects of the TinyBase framework. The [Countries](/demos/countries/) demo also loads one of its stores from a server.

See the [`RemotePersister`](/api/persister-remote/interfaces/persister/remotepersister/) interface for more details on how to pull data down from a server. Note that it _is_ possible to configure that [`Persister`](/api/persisters/interfaces/persister/persister/) to 'save' data back to the server, but for anything other than the simplest use-cases, you may want to consider using a [`Synchronizer`](/api/synchronizers/interfaces/synchronizer/synchronizer/) instead, so that multiple clients can edit data without conflict. We'll discuss that option later in this guide.

### 2\. Browser Storage

Another way to upgrade the standalone experience is to have TinyBase persist its data to the browser's storage. This way, the data or state can be preserved when the app is reloaded, or even when it is returned to in a later session. This is a basic 'local-only' approach.

*   **Pros**: This approach provides persistence of data and state between reloads and sessions.
*   **Cons**: Data is only stored in one particular browser on one particular device. The data may also get evicted (and its size limited) by the browser, depending on the storage used.

The [Todo App v1 (the basics)](/demos/todo-app/todo-app-v1-the-basics/) and the [Todo App v3 (persistence)](/demos/todo-app/todo-app-v3-persistence/) demo are good examples of how to get started with an app like this. Also see the [`SessionPersister`](/api/persister-browser/interfaces/persister/sessionpersister/) and [`LocalPersister`](/api/persister-browser/interfaces/persister/localpersister/) documentation for more details.

### 3\. Client Database Storage

As well as its native storage techniques, there are now many options for running richer client-side databases, such as SQLite or PGLite, in the browser. These solutions typically rely on WASM packages to provide the database functionality and then store the underlying data in IndexedDB or OPFS. Similar database run times might also be provided natively in some client environments (like React Native or Node- or Bun-based solutions).

TinyBase can persist its own data to a relational database like this, either serialized as JSON or in a more structured relational form, where TinyBase tables map directly to database tables.

*   **Pros**: This approach provides more structured persistence of data with less likelihood of eviction. Relational data can also be queried or updated with SQL outside of TinyBase (though it will nevertheless react to those changes).
*   **Cons**: A WASM payload is required to provide the database functionality in the browser, increasing asset size, and some of these client solutions are still young and experimental.

See the [`SqliteWasmPersister`](/api/persister-sqlite-wasm/interfaces/persister/sqlitewasmpersister/) and [`PglitePersister`](/api/persister-pglite/interfaces/persister/pglitepersister/) documentation for two of the browser-based database solutions. [`ExpoSqlitePersister`](/api/persister-expo-sqlite/interfaces/persister/exposqlitepersister/) is appropriate for Expo-based React Native projects.

### 4\. Client-Only [Synchronization](/guides/synchronization/)

Regardless of the client storage solution you choose, you may want to synchronize data between clients, either because you're supporting single users with multiple devices, or multiple users sharing common data.

This relies on you instantiating your data in a TinyBase [`MergeableStore`](/api/mergeable-store/interfaces/mergeable/mergeablestore/), which captures metadata for deterministic synchronization. Each client then uses a [`Synchronizer`](/api/synchronizers/interfaces/synchronizer/synchronizer/) (such as the WebSocket-based [`WsSynchronizer`](/api/synchronizer-ws-client/interfaces/synchronizer/wssynchronizer/)) to negotiate changes with others. WebSockets require a lightweight server that can forward and broadcast messages between clients.

*   **Pros**: This approach lets users share data between devices or with each other. Combined with client storage, this can also support offline usage with eventual reconciliation.
*   **Cons**: There is technically no 'source of truth': each client negotiates to merge changes with each other. If all devices evict their client storage simultaneously, the data is lost.

See the [`MergeableStore`](/api/mergeable-store/interfaces/mergeable/mergeablestore/) documentation and the [Synchronization](/guides/synchronization/) guide to understand how this works. The [Todo App v6 (collaboration)](/demos/todo-app/todo-app-v6-collaboration/) demo shows client-to-client synchronization for a simple to-do list application. The server is created, in a simple Node- or Bun-style environment with the [`createWsServer`](/api/synchronizer-ws-server/functions/creation/createwsserver/) function.

### 5\. Client-Server [Synchronization](/guides/synchronization/)

From here it is only a simple step to add server storage into the mix, removing the risk of all client devices clearing their data simultaneously and it being lost.

Here, the synchronizer server (which is coordinating messages between clients) _also_ acts as a 'client' with an instance of TinyBase itself. This is most usefully then persisted to a server storage solution, such as SQLite, PostgreSQL, the file system, or a Cloudflare Durable Object.

*   **Pros**: The server can now be considered a more permanent 'source of truth' than clients. Authentication and data integrity can now be more easily enforced.
*   **Cons**: The only minor downside of this approach is the need for the server to have a copy of the TinyBase store in memory, so the default solutions page it in and out from the persisted storage when clients connect or disconnect.

See the [`createWsServer`](/api/synchronizer-ws-server/functions/creation/createwsserver/) function for details of how to create a persister for the synchronization server, such as [`Sqlite3Persister`](/api/persister-sqlite3/interfaces/persister/sqlite3persister/) or [`PostgresPersister`](/api/persister-postgres/interfaces/persister/postgrespersister/).

A reliable all-in-one solution is to run both synchronization and storage on Cloudflare. Check out the [Cloudflare Durable Objects](/guides/integrations/cloudflare-durable-objects/) guide and the dedicated [Vite starter template](https://github.com/tinyplex/vite-tinybase-ts-react-sync-durable-object) to see how to set this up.

### 6\. Third-Party [Synchronization](/guides/synchronization/)

For completeness, it's worth mentioning that TinyBase can also integrate with other database and synchronization platforms. In these cases, you simply persist data locally and the third-party service takes care of the synchronization to a server or cloud service.

(It is also possible to persist your data via two other open-source CRDT solutions, namely Yjs and Automerge, using the [`YjsPersister`](/api/persister-yjs/interfaces/persister/yjspersister/) and [`AutomergePersister`](/api/persister-automerge/interfaces/persister/automergepersister/) interfaces respectively.)

*   **Pros**: You can add TinyBase into applications that are already using a third-party synchronization platform. Conversely you can then abstract away your choice of synchronization platform behind a consistent TinyBase API, preventing vendor lock-in.
*   **Cons**: This approach adds additional moving parts, other libraries, and possible fees for commercial services, based on usage.

For more details on these interfaces, see the [`ElectricSqlPersister`](/api/persister-electric-sql/interfaces/persister/electricsqlpersister/), [`PowerSyncPersister`](/api/persister-powersync/interfaces/persister/powersyncpersister/), and [`LibSqlPersister`](/api/persister-libsql/interfaces/persister/libsqlpersister/) (Turso) interfaces. The APIs, consistent with the other SQLite- and PostgreSQL-based persisters, are described in the [Database Persistence](/guides/persistence/database-persistence/) guide.

### Mix It Up!

It should go without saying that very few of these options are mutually exclusive! You can mix and match them as you see fit, depending on the way you want your persistence and synchronization to work. Not only that, you can of course have multiple Stores in your app, each with its own persistence and synchronization strategy.

For example, a complex app might have multiple TinyBase stores use in lots of different ways:

*   Transient state that is stored just in memory and not preserved between sessions.
*   Views, routes and settings that are stored in the browser's local storage.
*   Reference data that is read in from a server at startup, perhaps then stored in a client database for faster future loads.
*   User documents that are synchronized between clients and a server, with the server persisting them as an 'source of truth'.

[TinyHub](https://tinyhub.org/#/) uses several of these techniques throughout its client app. Its [different stores](https://github.com/tinyplex/tinyhub/tree/main/client/src/stores) are each initialized with different persister strategies.

### Summary

TinyBase provides many different architectural choices, depending on the type of app you are building, and where you want the data to reside when not in use.

Next we will show how you can quickly build user interfaces on top of a [`Store`](/api/store/interfaces/store/store/), and for that, it's time to proceed to the [Building UIs](/guides/building-uis/) guide.

---

## Page: https://beta.tinybase.org/guides/building-uis/

*   [TinyBase](/)
*   [Guides](/guides/)
*   [Building UIs](/guides/building-uis/)

Building UIs
============

These guides cover how to use the [`ui-react`](/api/ui-react/) module and use React hooks and components to easily build reactive user interfaces with TinyBase.

See also the [Countries](/demos/countries/) demo, the [Todo App](/demos/todo-app/) demos, and the [Drawing](/demos/drawing/) demo.

Getting Started With ui-react
-----------------------------

To build React-based user interfaces with TinyBase, you will need to install the [`ui-react`](/api/ui-react/) module in addition to the main module, and, of course, React itself. [Read more](/guides/building-uis/getting-started-with-ui-react/).

Using React Hooks
-----------------

There are reactive hooks in the [`ui-react`](/api/ui-react/) module for accessing every part of a [`Store`](/api/store/interfaces/store/store/), as well as more advanced things like the [`Metrics`](/api/metrics/interfaces/metrics/metrics/) and [`Indexes`](/api/indexes/interfaces/indexes/indexes/) objects. [Read more](/guides/building-uis/using-react-hooks/).

Using React Components
----------------------

The reactive components in the [`ui-react`](/api/ui-react/) module let you declaratively display parts of a [`Store`](/api/store/interfaces/store/store/). [Read more](/guides/building-uis/using-react-components/).

Using React DOM Components
--------------------------

The reactive components in the [`ui-react-dom`](/api/ui-react-dom/) module let you declaratively display parts of a [`Store`](/api/store/interfaces/store/store/) in a web browser, where the ReactDOM module is available. [Read more](/guides/building-uis/using-react-dom-components/).

Using Context
-------------

The [`ui-react`](/api/ui-react/) module includes a context provider that lets you avoid passing global objects down through your component hierarchy. [Read more](/guides/building-uis/using-context/).

---

## Page: https://beta.tinybase.org/guides/building-uis/getting-started-with-ui-react/

*   [TinyBase](/)
*   [Guides](/guides/)
*   [Building UIs](/guides/building-uis/)
*   [Getting Started With ui-react](/guides/building-uis/getting-started-with-ui-react/)

Getting Started With ui-react
=============================

To build React-based user interfaces with TinyBase, you will need to install the [`ui-react`](/api/ui-react/) module in addition to the main module, and, of course, React itself.

For example, in an HTML file, you can get started with boilerplate that might look like this:

    <html>
      <head>
        <title>My First TinyBase App</title>
        <script type="importmap">
          {
            "imports": {
              "tinybase": "https://esm.sh/tinybase@6.0.0",
              "tinybase/ui-react": "https://esm.sh/tinybase@6.0.0/ui-react",
              "react": "https://esm.sh/react@19.0.0",
              "react/jsx-runtime": "https://esm.sh/react@19.0.0/jsx-runtime",
              "react-dom/client": "https://esm.sh/react-dom@19.0.0/client"
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
    

Open this file in your browser and you should see the words '[Hello World](/demos/hello-world/)' on the screen, having been written to, and read from, a [`Store`](/api/store/interfaces/store/store/), and then rendered by the [`CellView`](/api/ui-react/functions/store-components/cellview/) component from the [`ui-react`](/api/ui-react/) module.

Note that the standalone `https://esm.sh/tsx` script and `text/jsx` type on the script here are merely to support JSX in the browser and for the purposes of illustrating how to get started quickly. In a production environment you should pre-compile and your JSX and modules to create a bundled browser app. If you're bundling the whole app, you can of course import the [`ui-react`](/api/ui-react/) module something like this.

Boilerplate aside, let's move on to understand how to use hooks in the [`ui-react`](/api/ui-react/) module, with the [Using React Hooks](/guides/building-uis/using-react-hooks/) guide.

---

## Page: https://beta.tinybase.org/guides/building-uis/using-react-hooks/

*   [TinyBase](/)
*   [Guides](/guides/)
*   [Building UIs](/guides/building-uis/)
*   [Using React Hooks](/guides/building-uis/using-react-hooks/)

Using React Hooks
=================

There are reactive hooks in the [`ui-react`](/api/ui-react/) module for accessing every part of a [`Store`](/api/store/interfaces/store/store/), as well as more advanced things like the [`Metrics`](/api/metrics/interfaces/metrics/metrics/) and [`Indexes`](/api/indexes/interfaces/indexes/indexes/) objects.

By reactive hooks, we mean that the hook not only fetches part of the [`Store`](/api/store/interfaces/store/store/), but that it also registers a listener that will then cause a component to re-render if the underlying value changes. Therefore, it's easy to describe a user interface in terms of raw data in a [`Store`](/api/store/interfaces/store/store/), and know that it will stay updated when the data changes.

To start with a simple example, we use the [`useCell`](/api/ui-react/functions/store-hooks/usecell/) hook in a component called `App` to get the value of a [`Cell`](/api/store/type-aliases/store/cell/) and render it in a `<span>` element. When the [`Cell`](/api/store/type-aliases/store/cell/) is updated, so is the HTML.

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
    

There are hooks that correspond to each of the [`Store`](/api/store/interfaces/store/store/) getter methods:

*   The [`useValues`](/api/ui-react/functions/store-hooks/usevalues/) hook is the reactive equivalent of the [`getValues`](/api/store/interfaces/store/store/methods/getter/getvalues/) method.
*   The [`useValueIds`](/api/ui-react/functions/store-hooks/usevalueids/) hook is the reactive equivalent of the [`getValueIds`](/api/store/interfaces/store/store/methods/getter/getvalueids/) method.
*   The [`useValue`](/api/ui-react/functions/store-hooks/usevalue/) hook is the reactive equivalent of the [`getValue`](/api/store/interfaces/store/store/methods/getter/getvalue/) method.

And for tabular data:

*   The [`useTables`](/api/ui-react/functions/store-hooks/usetables/) hook is the reactive equivalent of the [`getTables`](/api/store/interfaces/store/store/methods/getter/gettables/) method.
*   The [`useTableIds`](/api/ui-react/functions/store-hooks/usetableids/) hook is the reactive equivalent of the [`getTableIds`](/api/store/interfaces/store/store/methods/getter/gettableids/) method.
*   The [`useTable`](/api/ui-react/functions/store-hooks/usetable/) hook is the reactive equivalent of the [`getTable`](/api/store/interfaces/store/store/methods/getter/gettable/) method.
*   The [`useTableCellIds`](/api/ui-react/functions/store-hooks/usetablecellids/) hook is the reactive equivalent of the [`getTableCellIds`](/api/store/interfaces/store/store/methods/getter/gettablecellids/) method.
*   The [`useRowIds`](/api/ui-react/functions/store-hooks/userowids/) hook is the reactive equivalent of the [`getRowIds`](/api/store/interfaces/store/store/methods/getter/getrowids/) method.
*   The [`useSortedRowIds`](/api/ui-react/functions/store-hooks/usesortedrowids/) hook is the reactive equivalent of the [`getSortedRowIds`](/api/store/interfaces/store/store/methods/getter/getsortedrowids/) method.
*   The [`useRow`](/api/ui-react/functions/store-hooks/userow/) hook is the reactive equivalent of the [`getRow`](/api/store/interfaces/store/store/methods/getter/getrow/) method.
*   The [`useCellIds`](/api/ui-react/functions/store-hooks/usecellids/) hook is the reactive equivalent of the [`getCellIds`](/api/store/interfaces/store/store/methods/getter/getcellids/) method.
*   The [`useCell`](/api/ui-react/functions/store-hooks/usecell/) hook is the reactive equivalent of the [`getCell`](/api/store/interfaces/store/store/methods/getter/getcell/) method.

They have the same return types. For example, the [`useTable`](/api/ui-react/functions/store-hooks/usetable/) hook returns an object:

    import {useTable} from 'tinybase/ui-react';
    
    const App2 = () => <span>{JSON.stringify(useTable('pets', store))}</span>;
    root.render(<App2 />);
    console.log(app.innerHTML);
    // -> '<span>{"fido":{"color":"walnut"}}</span>'
    
    store.setCell('pets', 'fido', 'species', 'dog');
    console.log(app.innerHTML);
    // -> '<span>{"fido":{"color":"walnut","species":"dog"}}</span>'
    

When the component is unmounted, the listener will be automatically removed. This means you can use these hooks without having to worry too much about the lifecycle of how your component interacts with the [`Store`](/api/store/interfaces/store/store/).

### Using Hooks To Set Data

In an interactive application, you don't just want to read data. You also want to be able to set it in response to user's actions. For this purpose, there is a group of hooks that return callbacks for setting data based on events.

Let's start with a simple example, the [`useSetCellCallback`](/api/ui-react/functions/store-hooks/usesetcellcallback/) hook. The [`Cell`](/api/store/type-aliases/store/cell/) to be updated needs to be identified by the [`Table`](/api/store/type-aliases/store/table/), [`Row`](/api/store/type-aliases/store/row/), and [`Cell`](/api/store/type-aliases/store/cell/) [`Id`](/api/common/type-aliases/identity/id/) parameters. The fourth parameter to the hook is a parameterized callback (that will be memoized based on the dependencies in the fifth parameter). The responsibility of that function is to return the value that will be used to update the [`Cell`](/api/store/type-aliases/store/cell/).

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
    

In the real-world, a more valid case for using the event parameter might be to handle the content of a text input to write into the [`Store`](/api/store/interfaces/store/store/). See the Todo demo for a working example of doing that with the [`useAddRowCallback`](/api/ui-react/functions/store-hooks/useaddrowcallback/) hook to add new todos.

### Other Hook Types

The hooks to read and write [`Store`](/api/store/interfaces/store/store/) data (described above) will be the ones you most commonly use. For completeness, there are three other broad groups of hooks. Firstly, there are those that create callbacks to delete data (such as the [`useDelRowCallback`](/api/ui-react/functions/store-hooks/usedelrowcallback/) hook), which should be self-explanatory.

Then there are hooks that are used to create objects (including [`Store`](/api/store/interfaces/store/store/) objects, but also [`Metrics`](/api/metrics/interfaces/metrics/metrics/), and [`Indexes`](/api/indexes/interfaces/indexes/indexes/) objects, and so on). These are essentially convenient aliases for memoization so that object creation can be performed inside a component without fear of creating a new instance per render:

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
    

There is also a final group of hooks that add listeners (such as the [`useCellListener`](/api/ui-react/functions/store-hooks/usecelllistener/) hook). Since the regular hooks (like the [`useCell`](/api/ui-react/functions/store-hooks/usecell/) hook) already register listeners to track changes, you won't often need to use these unless you need to establish a listener in a component that has some other side-effect, such as mutating data to enforce a schema, for example.

### Summary

The hooks available in the [`ui-react`](/api/ui-react/) module make it easy to connect your user interface to TinyBase [`Store`](/api/store/interfaces/store/store/) data. It also contains some convenient components that you can use to build your user interface more declaratively. For that, let's proceed to the [Using React Components](/guides/building-uis/using-react-components/) guide.

---

## Page: https://beta.tinybase.org/guides/building-uis/using-react-components/

*   [TinyBase](/)
*   [Guides](/guides/)
*   [Building UIs](/guides/building-uis/)
*   [Using React Components](/guides/building-uis/using-react-components/)

Using React Components
======================

The reactive components in the [`ui-react`](/api/ui-react/) module let you declaratively display parts of a [`Store`](/api/store/interfaces/store/store/).

These are all essentially convenience wrappers around the hooks we described in the [Using React Hooks](/guides/building-uis/using-react-hooks/) guide, but make it easy to build hierarchical component trees from the [`Store`](/api/store/interfaces/store/store/) data. For example, the [`ValuesView`](/api/ui-react/functions/store-components/valuesview/) component wraps around the [`useValueIds`](/api/ui-react/functions/store-hooks/usevalueids/) hook to render child [`ValueView`](/api/ui-react/functions/store-components/valueview/) components. Similarly, the [`TablesView`](/api/ui-react/functions/store-components/tablesview/) component wraps around the [`useTableIds`](/api/ui-react/functions/store-hooks/usetableids/) hook to render child [`TableView`](/api/ui-react/functions/store-components/tableview/) components, which in turn can render child [`RowView`](/api/ui-react/functions/store-components/rowview/) components and [`CellView`](/api/ui-react/functions/store-components/cellview/) components.

In this simple example, the [`CellView`](/api/ui-react/functions/store-components/cellview/) component is used to render the color [`Cell`](/api/store/type-aliases/store/cell/) in a `<span>`:

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
    

These components have very plain default renderings, and don't even generate HTML or use ReactDOM. This means that the [`ui-react`](/api/ui-react/) module works just as well with React Native or other React-based rendering systems.

It does mean though, that if you use the default [`RowView`](/api/ui-react/functions/store-components/rowview/) component, you will simply render a concatenation of the values of its Cells:

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
    

Going further, the `debugIds` prop helps you see the structure of the objects with their [`Ids`](/api/common/type-aliases/identity/ids/).

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

More likely than JSON-like strings, you will want to customize or compose the rendering of parts of the [`Store`](/api/store/interfaces/store/store/) for your UI. The way this works is that each of the react-ui module components has a prop that takes an alternative rendering for its children.

For example, the [`TableView`](/api/ui-react/functions/store-components/tableview/) component takes a `rowComponent` prop that lets you indicate how each [`Row`](/api/store/type-aliases/store/row/) should be rendered, and the [`RowView`](/api/ui-react/functions/store-components/rowview/) component takes a `cellComponent` prop that lets you indicate how each [`Cell`](/api/store/type-aliases/store/cell/) should be rendered. The component passed in to such props itself needs to be capable of taking the same props that the default component would have.

To render the contents of a [`Table`](/api/store/type-aliases/store/table/) into an HTML table, therefore, you might set the components up like this:

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
    

That is now starting to resemble a useful UI for tabular data! A final touch here is that each view can also let you create custom props for each of its children. For example the `getRowComponentProps` prop of the [`TableView`](/api/ui-react/functions/store-components/tableview/) component should be a function that returns additional props that will be passed to each child. See the API documentation for more examples.

### Summary

The components available in the [`ui-react`](/api/ui-react/) module make it easy to enumerate over objects to build your user interface with customized, composed components. This will work wherever the React module does, including React Native.

When you are building an app in a web browser, however, where the ReactDOM module is available, TinyBase includes pre-made HTML components. We will look at these in the next [Using React DOM Components](/guides/building-uis/using-react-dom-components/) guide.

---

## Page: https://beta.tinybase.org/guides/building-uis/using-react-dom-components/

*   [TinyBase](/)
*   [Guides](/guides/)
*   [Building UIs](/guides/building-uis/)
*   [Using React DOM Components](/guides/building-uis/using-react-dom-components/)

Using React DOM Components
==========================

The reactive components in the [`ui-react-dom`](/api/ui-react-dom/) module let you declaratively display parts of a [`Store`](/api/store/interfaces/store/store/) in a web browser, where the ReactDOM module is available.

These are generally implementations of the components we discussed in the previous guide, but are specifically designed to render HTML content in a browser.

Styling and class names are very basic, since you are expected to style them with CSS to fit your app's overall styling.

The easiest way to understand these components is to see them all in action in the [UI Components](/demos/ui-components/) demos. There are table-based components for rendering [`Tables`](/api/store/type-aliases/store/tables/), sorted [`Tables`](/api/store/type-aliases/store/tables/), [`Values`](/api/store/type-aliases/store/values/), and so on:

Component

Purpose

[`ValuesInHtmlTable`](/api/ui-react-dom/functions/store-components/valuesinhtmltable/)

Renders [`Values`](/api/store/type-aliases/store/values/).

[demo](/demos/ui-components/valuesinhtmltable/)

[`TableInHtmlTable`](/api/ui-react-dom/functions/store-components/tableinhtmltable/)

Renders a [`Table`](/api/store/type-aliases/store/table/).

[demo](/demos/ui-components/tableinhtmltable/)

[`SortedTableInHtmlTable`](/api/ui-react-dom/functions/store-components/sortedtableinhtmltable/)

Renders a sorted [`Table`](/api/store/type-aliases/store/table/), with optional interactivity.

[demo](/demos/ui-components/sortedtableinhtmltable/)

[`SliceInHtmlTable`](/api/ui-react-dom/functions/indexes-components/sliceinhtmltable/)

Renders a [`Slice`](/api/indexes/type-aliases/concept/slice/) from an [`Index`](/api/indexes/type-aliases/concept/index/).

[demo](/demos/ui-components/sliceinhtmltable/)

[`RelationshipInHtmlTable`](/api/ui-react-dom/functions/relationships-components/relationshipinhtmltable/)

Renders the local and remote [`Tables`](/api/store/type-aliases/store/tables/) of a relationship

[demo](/demos/ui-components/relationshipinhtmltable/)

[`ResultTableInHtmlTable`](/api/ui-react-dom/functions/queries-components/resulttableinhtmltable/)

Renders a [`ResultTable`](/api/queries/type-aliases/result/resulttable/).

[demo](/demos/ui-components/resulttableinhtmltable/)

[`ResultSortedTableInHtmlTable`](/api/ui-react-dom/functions/queries-components/resultsortedtableinhtmltable/)

Renders a sorted [`ResultTable`](/api/queries/type-aliases/result/resulttable/), with optional interactivity.

[demo](/demos/ui-components/resultsortedtableinhtmltable/)

There are also editable components for individual Cells and [`Values`](/api/store/type-aliases/store/values/):

Component

Purpose

[`EditableCellView`](/api/ui-react-dom/functions/store-components/editablecellview/)

Renders a [`Cell`](/api/store/type-aliases/store/cell/) and lets you change its type and value.

[demo](/demos/ui-components/editablecellview/)

[`EditableValueView`](/api/ui-react-dom/functions/store-components/editablevalueview/)

Renders a [`Value`](/api/store/type-aliases/store/value/) and lets you change its type and value.

[demo](/demos/ui-components/editablevalueview/)

We finish off this section with a best practice to avoid passing the global [`Store`](/api/store/interfaces/store/store/) down into components. Please proceed to to the [Using Context](/guides/building-uis/using-context/) guide!

---

## Page: https://beta.tinybase.org/guides/building-uis/using-context/

*   [TinyBase](/)
*   [Guides](/guides/)
*   [Building UIs](/guides/building-uis/)
*   [Using Context](/guides/building-uis/using-context/)

Using Context
=============

The [`ui-react`](/api/ui-react/) module includes a context provider that lets you avoid passing global objects down through your component hierarchy.

One thing you may have noticed (especially with the hooks) is how we've had to reference the global [`Store`](/api/store/interfaces/store/store/) object within components (or potentially drill it through the hierarchy with props). It's very likely that your whole app (or parts of it) will use the same [`Store`](/api/store/interfaces/store/store/) throughout, though.

To help with this, the [`Provider`](/api/ui-react/functions/context-components/provider/) component lets you specify a [`Store`](/api/store/interfaces/store/store/) that all the hooks and components will bind to automatically. Simply provide the [`Store`](/api/store/interfaces/store/store/) in the `store` prop, and it will be used by default. Notice how the `store` variable is not referenced in the child `Pane` component here, for example:

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
    

Obviously this requires your components to be used in a context where you know the right sort of [`Store`](/api/store/interfaces/store/store/) will be available.

### Context With Multiple Stores

In cases where you want to have multiple [`Store`](/api/store/interfaces/store/store/) objects available to an application, the [`Provider`](/api/ui-react/functions/context-components/provider/) component takes a `storesById` prop that is an object keyed by [`Id`](/api/common/type-aliases/identity/id/). Your hooks and components use the [`Id`](/api/common/type-aliases/identity/id/) to indicate which they want to use:

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

[`Provider`](/api/ui-react/functions/context-components/provider/) components can be nested and the contexts are merged. This last example is a little verbose, but shows how two [`Store`](/api/store/interfaces/store/store/) objects each keyed with a different [`Id`](/api/common/type-aliases/identity/id/) are both visible, despite having been set in two different [`Provider`](/api/ui-react/functions/context-components/provider/) components:

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

We have covered the main parts of the [`ui-react`](/api/ui-react/) module, including its hooks and components, and the way it supports context to make [`Store`](/api/store/interfaces/store/store/) objects available.

Next we talk about how a [`Store`](/api/store/interfaces/store/store/) can have a [`TablesSchema`](/api/store/type-aliases/schema/tablesschema/) and can be persisted. Let's move onto the [Schemas](/guides/schemas/) guide to find out more.