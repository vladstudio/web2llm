---
rerun_command: >-
  node crawl.js -u "https://beta.tinybase.org/guides/schemas/" --crawl-mode
  strict --limit 100 -e
  "\\.(txt|pdf|zip|tar|gz|rar|docx?|xlsx?|pptx?|jpe?g|png|gif|svg|webp|mp[34])$"
  --output "test.md"
command_args:
  url:
    - https://beta.tinybase.org/guides/schemas/
  crawl-mode: strict
  limit: 100
  exclude:
    - >-
      \.(txt|pdf|zip|tar|gz|rar|docx?|xlsx?|pptx?|jpe?g|png|gif|svg|webp|mp[34])$
  output: test.md
---

## Page: https://beta.tinybase.org/guides/schemas/

These guides discuss how to set up a `ValuesSchema` or `TablesSchema` on a `Store` so that certain structures of data are assured.

See also the Countries demo, the Todo App demos, and the Drawing demo.

## Using Schemas

Schemas are a simple declarative way to say what data you would like to store. Read more.

## Schema-Based Typing

You can use type definitions that infer API types from the schemas you apply, providing a powerful way to improve your developer experience when you know the shape of the data being stored. Read more.

## Mutating Data With Listeners

Although listeners are normally prevented from updating data, there are times when you may want to - such as when you are programmatically checking your data as it gets updated. Read more.

---

## Page: https://beta.tinybase.org/guides/schemas/using-schemas/

Schemas are a simple declarative way to say what data you would like to store.

A `ValuesSchema` simply describes specific `Value` types and default. A `TablesSchema` describes specific `Cell` types and defaults in specific `Tables`.

Each is a JavaScript object, and to apply them, you use the `setValuesSchema` method and `setTablesSchema` method respectively.

### Adding A `ValuesSchema`

Typically you will want to set a `ValuesSchema` prior to loading and setting data in your `Store`:

    import {createStore} from 'tinybase';
    
    const store = createStore().setValuesSchema({
      employees: {type: 'number'},
      open: {type: 'boolean', default: false},
    });
    store.setValues({employees: 3, website: 'pets.com'});
    console.log(store.getValues());
    // -> {employees: 3, open: false}
    

In the above example, we indicated that the `Store` contains an `employees` `Value` (which needs to be a number) and an `open` `Value` (which needs to be a boolean).

As you can see, when a `Values` object is used that doesn't quite match those constraints, the data is corrected. The `website` `Value` is ignored, and the missing `open` `Value` gets defaulted to `false`.

### Adding A `TablesSchema`

Tabular schemas are similar. Set a `TablesSchema` prior to loading data into your `Tables`:

    store.setTablesSchema({
      pets: {
        species: {type: 'string'},
        sold: {type: 'boolean', default: false},
      },
    });
    store.setRow('pets', 'fido', {species: 'dog', color: 'brown', sold: 'maybe'});
    console.log(store.getTables());
    // -> {pets: {fido: {species: 'dog', sold: false}}}
    

In the above example, we indicated that the `Store` contains a single `pets` `Table`, each `Row` of which has a `species` `Cell` (which needs to be a string) and a `sold` `Cell` (which needs to be a boolean).

Again, when a `Row` is added that doesn't quite match those constraints, the data is corrected. The `color` `Cell` is ignored, and the `sold` string is corrected to the default `false` value.

In general, if a default value is provided (and its type is correct), you can be certain that that `Cell` will always be present in a `Row`. If the default value is _not_ provided (or its type is incorrect), the `Cell` may be missing from the `Row`. But when it is present you can be guaranteed it is of the correct type.

### Altering A Schema

You can also set or change the `ValuesSchema` or `TablesSchema` after data has been added to the `Store`. Note that this may result in a change to data in the `Store`, as defaults are applied or as invalid `Value`, `Table`, `Row`, or `Cell` objects are removed. These changes will fire any listeners to that data, as expected.

In this example, the `TablesSchema` gains a new required field that is added to the current `Row` to make it compliant:

    store.setTablesSchema({
      pets: {
        species: {type: 'string'},
        legs: {type: 'number', default: 4},
        sold: {type: 'boolean', default: false},
      },
    });
    console.log(store.getTables());
    // -> {pets: {fido: {species: 'dog', sold: false, legs: 4}}}
    

The `TablesSchema` does not attempt to cast data. If a field needs to be of a particular type, it really needs to be of that type:

    store.setCell('pets', 'fido', 'legs', '3');
    console.log(store.getTables());
    // -> {pets: {fido: {species: 'dog', sold: false, legs: 4}}}
    
    store.setCell('pets', 'fido', 'legs', 3);
    console.log(store.getTables());
    // -> {pets: {fido: {species: 'dog', sold: false, legs: 3}}}
    

### Be Aware Of Potential Data Loss

In order to guarantee that a schema is met, `Value` or `Cell` data may be removed. In the case of a `Cell` being removed, this might result in the removal of a whole `Row`.

In this case, for example, the `TablesSchema` changes quite dramatically and none of the Cells of the existing data match it, so the `Row` is deleted:

    store.setTablesSchema({
      pets: {
        color: {type: 'string'},
        weight: {type: 'number'},
      },
    });
    console.log(store.getTables());
    // -> {}
    

When no longer needed, you can also completely removes existing schemas with the `delValuesSchema` method or the `delTablesSchema` method.

### Summary

Adding a schema gives you a simple declarative way to describe your data structure.

You can also benefit from a better developer experience based on these schemas, and for that we turn to the Schema-Based Typing guide.

---

## Page: https://beta.tinybase.org/guides/schemas/schema-based-typing/

*   TinyBase
*   Guides
*   Schemas
*   Schema-Based Typing

You can use type definitions that infer API types from the schemas you apply, providing a powerful way to improve your developer experience when you know the shape of the data being stored.

The schema-based definitions can be accessed by adding the `with-schemas` suffix to your imports. For example:

    import {createStore} from 'tinybase/with-schemas';
    
    // NB the 'with-schemas'
    
    const store = createStore().setValuesSchema({
      employees: {type: 'number'},
      open: {type: 'boolean', default: false},
    });
    
    store.setValues({employees: 3}); //                      OK
    store.setValues({employees: true}); //                   TypeScript error
    store.setValues({employees: 3, website: 'pets.com'}); // TypeScript error
    

In this example, the store is known to have the `ValuesSchema` provided, and all relevant methods will have type constraints accordingly, even for listeners:

    store.addValueListener(null, (store, valueId, newValue, oldValue) => {
      valueId == 'employees'; // OK
      valueId == 'open'; //      OK
      valueId == 'website'; //   TypeScript error
    
      if (valueId == 'employees') {
        newValue as number; //   OK
        oldValue as number; //   OK
        newValue as boolean; //  TypeScript error
        oldValue as boolean; //  TypeScript error
      }
      if (valueId == 'open') {
        newValue as boolean; //  OK
        oldValue as boolean; //  OK
      }
    });
    

### Getting the Typed `Store`

Only the `setSchema` method, `setTablesSchema` method, and `setValuesSchema` method return a typed `Store` object. So, to benefit from the typing, ensure you assign your `Store` variable to what those methods return, rather than just the `createStore` function.

For example, the following will work at runtime, but you will _not_ benefit from the developer experience of typing on the `store` variable as we did in the example above.

    import {createStore} from 'tinybase/with-schemas';
    
    const store = createStore(); // This is not a schema-typed Store
    
    store.setValuesSchema({
      employees: {type: 'number'},
      open: {type: 'boolean', default: false},
    }); // Instead you should use the return type from this method
    

One further thing to be aware of is that for the typing to work effectively, the schema must be passed in directly, or, if it is a variable, as a constant:

    const valuesSchema = {
      employees: {type: 'number'},
      open: {type: 'boolean', default: false},
    } as const; // NB the `as const` modifier
    store.setValuesSchema(valuesSchema);
    

It's worth noting that typing will adapt according to schemas being added, removed, or changed:

    const tablesSchema = {
      pets: {species: {type: 'string'}},
    } as const;
    
    const valuesSchema = {
      employees: {type: 'number'},
      open: {type: 'boolean', default: false},
    } as const;
    
    const store = createStore();
    const storeWithBothSchemas = store.setSchema(tablesSchema, valuesSchema);
    const storeWithJustValuesSchema = storeWithBothSchemas.delTablesSchema();
    const storeWithValuesAndNewTablesSchema = storeWithBothSchemas.setTablesSchema({
      pets: {
        species: {type: 'string'},
        sold: {type: 'boolean', default: false},
      },
    });
    

### Typing The ui-react Module

Schema-based typing for the `ui-react` module is handled a little differently, due to the fact that all of the hooks and components are top level functions in the module. It would be frustrating to apply a schema to type each and every one in turn.

Instead, you can use the `WithSchemas` type (which takes the `typeof` the schemas), and the following pattern after your import. This applies the schema types to the whole module en masse, and then you can select the hooks and components you want to use:

    import React from 'react';
    import * as UiReact from 'tinybase/ui-react/with-schemas';
    import {createStore} from 'tinybase/with-schemas';
    
    const tablesSchema = {
      pets: {species: {type: 'string'}},
    } as const;
    const valuesSchema = {
      employees: {type: 'number'},
      open: {type: 'boolean', default: false},
    } as const;
    
    // Cast the whole module to be schema-based with WithSchemas:
    const UiReactWithSchemas = UiReact as UiReact.WithSchemas<
      [typeof tablesSchema, typeof valuesSchema]
    >;
    // Deconstruct to access the hooks and components you need:
    const {TableView, useTable, ValueView} = UiReactWithSchemas;
    
    const store = createStore().setSchema(tablesSchema, valuesSchema);
    const App = () => (
      <div>
        <TableView store={store} tableId="species" /> {/*   OK               */}
        <TableView store={store} tableId="customers" /> {/* TypeScript error */}
        {/* ... */}
      </div>
    );
    

Note that in React Native, the resolution of modules and types isn't yet quite compatible with Node and TypeScript. You may need to try something like the following to explicitly load code and types from different folders:

    // code
    import React from 'react';
    import * as UiReact from 'tinybase/ui-react';
    import type {WithSchemas} from 'tinybase/ui-react/with-schemas';
    // types
    import {TablesSchema, ValuesSchema, createStore} from 'tinybase/with-schemas';
    
    const tablesSchema = {
      pets: {species: {type: 'string'}},
    } as const;
    const valuesSchema = {
      employees: {type: 'number'},
      open: {type: 'boolean', default: false},
    } as const;
    
    const UiReactWithSchemas = UiReact as unknown as WithSchemas<
      [typeof tablesSchema, typeof valuesSchema]
    >;
    
    //...
    

### Multiple Stores

In the case that you have multiple `Store` objects with different schemas, you will need to use `WithSchemas` several times, and deconstruct each, something like this:

    const UiReactWithPetShopSchemas = UiReact as UiReact.WithSchemas<
      [typeof petShopTablesSchema, typeof petShopValuesSchema]
    >;
    const {
      TableView: PetShopTableView,
      useTable: usePetShopTable,
      ValueView: usePetShopValueView,
    } = UiReactWithPetShopSchemas;
    
    const UiReactWithSettingsSchemas = UiReact as UiReact.WithSchemas<
      [typeof settingsTablesSchema, typeof settingsValuesSchema]
    >;
    const {
      TableView: SettingsTableView,
      useTable: useSettingsTable,
      ValueView: useSettingsValueView,
    } = UiReactWithSettingsSchemas;
    
    const petShopStore = createStore().setSchema(
      petShopTablesSchema,
      petShopValuesSchema,
    );
    const settingsStore = createStore().setSchema(
      settingsTablesSchema,
      settingsValuesSchema,
    );
    const App = () => (
      <div>
        <PetShopTableView store={petShopStore} tableId="species" />
        <SettingsTableView store={settingsStore} tableId="viewSettings" />
        {/* ... */}
      </div>
    );
    

### Summary

Schema-based typing provides a powerful developer-time experience for checking your code and autocompletion in your IDE. Remember to use the `with-schema` suffix on the import path and use the patterns described above.

We move on to discussing more complex programmatic enforcement of your data, and for that we turn to the Mutating Data With Listeners guide.

---

## Page: https://beta.tinybase.org/guides/schemas/mutating-data-with-listeners/

*   TinyBase
*   Guides
*   Schemas
*   Mutating Data With Listeners

Although listeners are normally prevented from updating data, there are times when you may want to - such as when you are programmatically checking your data as it gets updated.

### Configuring Listeners

By default, listeners cannot update data. For instance, you might imagine that this code will replace 'walnut' with 'brown' when the `color` `Cell` is updated. But in fact the correction will fail silently:

    import {createStore} from 'tinybase';
    
    const store = createStore();
    store.setRow('pets', 'fido', {species: 'dog', color: 'black'});
    
    const colorListenerId = store.addCellListener(
      'pets',
      null,
      'color',
      (store, tableId, rowId, cellId, newCell) => {
        if (newCell == 'walnut') {
          store.setCell(tableId, rowId, cellId, 'brown');
        }
      },
    );
    
    store.setCell('pets', 'fido', 'color', 'walnut');
    console.log(store.getTables());
    // -> {pets: {fido: {species: 'dog', color: 'walnut'}}}
    
    store.delListener(colorListenerId);
    

### Mutator Listeners

To indicate that a listener is a 'mutator' (meaning that you are willing to allow it to change data), simply set the `mutator` flag to true on the method that adds the listener to the `Store`.

In this example, the `Cell` value must be one of the known species, or else it is set to 'unknown':

    const SPECIES = ['unknown', 'dog', 'cat', 'worm'];
    store.addCellListener(
      'pets',
      null,
      'species',
      (store, tableId, rowId, cellId, newCell) => {
        if (!SPECIES.includes(newCell)) {
          store.setCell(tableId, rowId, cellId, SPECIES[0]);
        }
      },
      true, // This listener is permitted to mutate the Store.
    );
    
    store.setCell('pets', 'fido', 'species', 'worm');
    console.log(store.getTables());
    // -> {pets: {fido: {species: 'worm', color: 'walnut'}}}
    
    store.setCell('pets', 'fido', 'species', 'wolf');
    console.log(store.getTables());
    // -> {pets: {fido: {species: 'unknown', color: 'walnut'}}}
    

Note that all the listeners that are marked as mutators will run _before_ all of those that are not. This means you can be sure that when your read-only listeners fire, the data within the `Store` has already been been fully manipulated to your liking.

### Summary

We have now effectively implemented a programmatic schema, one which is capable of ensuring values are valid, and defaulting them to something else if not.

This same technique can also constrain numeric `Cell` values to valid ranges, for example - and even potentially have `Cell` values which are constrained by other `Cell` values (though note that this needs to be done carefully to avoid expensive or impossible constraint solutions).

One common circumstance for creating a `TablesSchema` for a `Store` is when you are loading data from a source and you want to ensure the data is sculpted as your application require. But how do you save and load `Store` data? For that we proceed to the Persistence guides.