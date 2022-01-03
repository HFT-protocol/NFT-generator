/**
 * Hodl Finance NftGen
 *
 * NftGen is a random class generator that creates multiple objects from a set
 * of parameters. Deliver the parameters in JSON format and the generate()
 * function will create the amount of objects with random values for each
 * parameter of the object.
 *
 * Written by: C. Karreman
 * 
 * Usage:
 *  let nft = new NftGen(jsonString);
 *  let nfts = nft.generate(count);
 *
 * The JSON string given should be a valid format and should look like:
 *  {
 *      "name": "Hodlnaut",                                 // Name of the token object
 *      "description": "NFT project to generate Hodlnauts", // Description of the token objects
 *      "params": [                                         // Parameter list for the token object
 *            {
 *                "param": "Class",                         // Parameter name
 *                "values": [                               // Possible values
 *                    {
 *                        "value": "Red Pill",              // Value for the parameter
 *                        "distribution": 0.6               // Chance of selection (between 0 and 1)
 *                    },
 *                    {
 *                        "value": "Blue Pill",
 *                        "distribution": 0.4
 *                    }
 *                ]
 *            },
 *            {
 *                "param": "Colors",
 *                "count": 3,                               // Optional max number of values, result is array
 *                "unique": true,                           // Optional for multiple values to be unique (n values must be bigger then count)
 *                "fill": [                                 // Optional random number of values
 *                    {
 *                        "value": 1,                       // Number of result values
 *                        "distribution": 0.5               // Chance of selection (between 0 and 1)
 *                    },
 *                    {
 *                        "value": 2,
 *                        "distribution": 0.25
 *                    },
 *                    {
 *                        "value": 3,
 *                        "distribution": 0.25
 *                    }
 *                ],
 *                "values": [
 *                    {
 *                        "value": "Red",
 *                        "distribution": 0.2
 *                    },
 *                    {
 *                        "value": "Grey",
 *                        "distribution": 0.2
 *                    },
 *                    {
 *                        "value": "Blue",
 *                        "distribution": 0.2
 *                    },
 *                    {
 *                        "value": "Yellow",
 *                        "distribution": 0.2
 *                    },
 *                    {
 *                        "value": "Green",
 *                        "distribution": 0.2
 *                    }
 *                ]
 *            }
 *      ]
 *  }
 *
 * Copyright 2022 Hodl Finance
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class NftGen {
    constructor(setup) {
        this.setup = typeof setup === "string"
            ? JSON.parse(setup)
            : setup;
    }

    generate(count) {
        const output = {
            name: this.setup.name,
            description: this.setup.description,
            nfts: []
        };

        for (let i = 0; i < count; i++) {
            output.nfts[i] = this.create_nft();
        }

        return output;
    }

    create_nft() {
        const result = {
            'UUID': NftGen.generateUUID()
        };

        for (let i = 0; i < this.setup.params.length; i++) {
            let param = this.setup.params[i];

            if (param.count > 0) {
                const fill = param.fill
                    ? this.#random_value(param.fill)
                    : param.count;

                result[param.param] = this.#random_array(param.values, fill, param.unique);
            } else {
                result[param.param] = this.#random_value(param.values);
            }
        }

        return result;
    }

    static generateUUID() {
        // Public Domain/MIT
        let d = new Date().getTime(); // Timestamp
        let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0; // Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random() * 16; // Random number between 0 and 16
            if (d > 0) {
                // Use timestamp until depleted
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {
                // Use microseconds since page-load if supported
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
    
    #random_value(values) {
        const rnd = Math.random();
        let sum = 0.0;

        for (let i = 0; i < values.length; i++) {
            sum += values[i].distribution;
            if (sum > rnd) return values[i].value;
        }

        return "None";
    }

    #random_array(values, fill, unique) {
        const result = [];
        
        for (let j = 0; j < fill; j++) {
            let value = this.#random_value(values);
            let retries = 0; // Escape for wrong defined unique parameters

            while (unique && result.includes(value) && retries < values.length) {
                value = this.#random_value(values);
                retries++; 
            }
            result[j] = value;

            if (retries >= values.length) break;
        }

        return result;
    }
}