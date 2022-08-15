# Unionversity
Education has finally reached its pinnacle with the establishment of a new-wave educational institution named Unionversity. At Unionversity, learners join together and combine their knowledge to gain a higher understanding of the world around them. While it’s changing the way we think about learning, Unionversity does have one interesting requirement: all students must write a type-safe program that enrolls them in their own courses and study groups.

This program must be able to search courses and study groups from a list, enroll in them, and print a list of currently enrolled events. Let’s test our skills of TypeScript to get enrolled. As we say at Unionversity, “ts-c you in class”!

---
## Union Types 

Unions allow us to define multiple allowed type members by separating each type member with a vertical line character |. With a union.

Unions can be written anywhere a type value is defined, including function parameters:

```
function printNumsAndStrings(statement:string| number) {
  console.log(`ℹ️ LOG:: ${statement}`);
}

printNumsAndStrings('hello!');
printNumsAndStrings(2);
```
---
## Type Narrowing

Typing with unions gives us more flexibility with type specificity, but there’s also more to consider. 


we could implement a type guard. A type guard is a conditional that checks if a variable is a certain type, like this:

```
function formatValue(value: string | number) {
  // Write your code here
  if(typeof value ==="string"){
    console.log(value.toLowerCase())
  }else if (typeof value ==="number"){
    console.log(value.toFixed(2));
  }
}

formatValue('Hiya');
formatValue(42);
```


Type narrowing is when TypeScript can figure out what type a variable can be at a given point in our code. In our examples, TypeScript has narrowed the type inside the type guard to only be a string. Type narrowing allows us to use unions, then perform type-specific logic without TypeScript getting in the way.

---

## Unions and Arrays

To create a union that supports multiple types for an array’s values, wrap the union in parentheses (string | number), then use array notation [].


listings is typed to allow string and number types as values in its array
```
function formatListings(listings:(string|number)[]) {
  return listings.map((listing) => {
    if (typeof listing === 'string') {
      return listing.toUpperCase();
    }

    if (typeof listing === 'number') {
      return `$${listing.toLocaleString()}`;
    }
  });
}

const result = formatListings([
  '123 Main St',
  226800,
  '580 Broadway Apt 4a',
  337900,
]);

console.log(result);
```
---
## Common Key Value Pairs
When we put type members in a union, TypeScript will only allow us to use the common methods and properties that all members of the union share. Take this code:

```
const batteryStatus: boolean | number = false;
 
batteryStatus.toString(); // No TypeScript error
batteryStatus.toFixed(2); // TypeScript error

```

Since batteryStatus can be a boolean or a number, TypeScript will only allow us to call methods that both number and boolean share. They both share .toString(), so we’re good there. But, since only number has a .toFixed() method, TypeScript will complain if we try to call it.

This rule also applies to type objects that we define. Take this code:

```
type Goose = { 
  isPettable: boolean; 
  hasFeathers: boolean;
  canThwartAPicnic: boolean;
}
 
type Moose = {
  isPettable: boolean; 
  hasHoofs: boolean;
}
 
const pettingZooAnimal: Goose | Moose = { isPettable: true };
 
console.log(pettingZooAnimal.isPettable); // No TypeScript error
console.log(pettingZooAnimal.hasHoofs); // TypeScript error
```

Like before, since .isPettable is on both Goose and Moose types, TypeScript will allow us to call it. But since .hasHoofs is only a property on Moose, we cannot call that method on pettingZooAnimal. Any properties or methods that are not shared by all of the union’s members won’t be allowed and will produce a TypeScript error.

---
## Unions with Literal Types
We can use literal types with TypeScript unions. Literal type unions are useful when we want to create distinct states within a program.

For instance, if we were writing the code that controlled stoplights, we might write a program like this:

```
type Status ='idle'| 'downloading'| 'complete';

function downloadStatus(status:Status){
  if(status ==="idle"){
    console.log('Download')
  }else if(status ==="downloading"){
     console.log('Download...')
  }else if(status ==="complete"){
    console.log('Your download is complete!')
  }
}


downloadStatus('idle');
```

This technique allows us to write functions that are specific about the states they can handle, which helps us write code that’s less prone to errors.