'use strict'

const IPFS = require('ipfs');
const all = require('it-all');
const uint8ArrayConcat = require('uint8arrays/concat');
const uint8ArrayFromString = require('uint8arrays/from-string');
const uint8ArrayToString = require('uint8arrays/to-string');


// Creating metadata obj
class Metadata {
  constructor(title, type, properties) {
    this.tile = title;
    this.type = type;
    this.properties = properties;
  }
};

class Properties {
constructor(name, description, image ) {
  this.name = name;
  this.description = description,
  this.image = image;
}
} 

class Name {
constructor(type, description) {
  this.type = type;
  this.description = description;
}
};

class Description {
constructor(type, description) {
  this.type = type;
  this.description = description;
}
};

class Image {
constructor(type, description) {
  this.type = type;
  this.description = description;
}
};


function createProperties(name, description, image) {
let name1 = new Name("string", name);
let description1 = new Description("string", description);
let image1 = new Image("string", image) ;

let properties = new Properties(name1, description1, image1);
console.log(properties);

return properties;
}

function createMetaData(name, description, image) {
let properties = createProperties(name, description, image);
let metadata = new Metadata("Asset Metadata", "object", properties);
let output = JSON.stringify(metadata);

return output;
}

async function main (name, description, url) {
  const node = await IPFS.create();
  const version = await node.version();

  console.log('Version:', version.version);

  var metadata = createMetaData(name, description, url);

  const file = await node.add({
    path: 'metadata.txt',
    content: uint8ArrayFromString(metadata)
  })

  console.log('Added file:', file.path, file.cid.toString());

  const data = uint8ArrayConcat(await all(node.cat(file.cid)));

  console.log('Added file contents:', uint8ArrayToString(data));
};

main("Doggie Art", "Art for dogey people", "http://google.com");
