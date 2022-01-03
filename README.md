# Hodl Finance NftGen

NftGen is a random class generator that creates multiple objects from a set
of parameters. Deliver the parameters in JSON format and the generate()
function will create the amount of objects with random values for each
parameter of the object.

Save the files from the repository and open the index.html in a web browser for a demo.

Usage (javascript):
```
  let nft = new NftGen(jsonString);
  let nfts = nft.generate(count);
```

The JSON string given should be a valid JSON format and should look like:
```
{
    "name": "Hodlnaut",                                 // Name of the token object
    "description": "NFT project to generate Hodlnauts", // Description of the token objects
    "params": [                                         // Parameterlist for the token object
        {
            "param": "Class",                         // Parameter name
            "values": [                               // Possible values
                {
                    "value": "Red Pill",              // Value for the parameter
                    "distribution": 0.6               // Chance of selection (between 0 and 1)
                },
                {
                    "value": "Blue Pill",
                    "distribution": 0.4
                }
            ]
        },
        {
            "param": "Colors",
            "count": 3,                               // Optional max number of values, result is array
            "unique": true,                           // Optional for multiple values to be unique (n values must be bigger then count)
            "fill": [                                 // Optional random number of values
                {
                    "value": 1,                       // Number of result values
                    "distribution": 0.5               // Chance of selection (between 0 and 1)
                },
                {
                    "value": 2,
                    "distribution": 0.25
                },
                {
                    "value": 3,
                    "distribution": 0.25
                }
            ],
            "values": [
                {
                    "value": "Red",
                    "distribution": 0.2
                },
                {
                    "value": "Grey",
                    "distribution": 0.2
                },
                {
                    "value": "Blue",
                    "distribution": 0.2
                },
                {
                    "value": "Yellow",
                    "distribution": 0.2
                },
                {
                    "value": "Green",
                    "distribution": 0.2
                }
            ]
        }
    ]
}
```

(C) Copyright 2022 Hodl Finance

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
