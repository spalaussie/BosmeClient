/**
 * Created by omsanti on 23/08/15.
 */
(function(){
    /**
     * @ngdoc object
     * @name lbServices.AuthProvider
     * @header lbServices.AuthProvider
     * @object
     *
     * @description
     *
     * A $resource object for interacting with the `AuthProvider` model.
     *
     * ## Example
     *
     * See
     * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
     * for an example of using this object.
     *
     */
    var module = angular.module("lbServices", ['ngResource']);
    module.factory(
        "AuthProvider",
        ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
            var R = Resource(
                urlBase + "/AuthProviders/:id",
                { 'id': '@id' },
                {

                    /**
                     * @ngdoc method
                     * @name lbServices.AuthProvider#create
                     * @methodOf lbServices.AuthProvider
                     *
                     * @description
                     *
                     * Create a new instance of the model and persist it into the data source.
                     *
                     * @param {Object=} parameters Request parameters.
                     *
                     *   This method does not accept any parameters.
                     *   Supply an empty object or omit this argument altogether.
                     *
                     * @param {Object} postData Request data.
                     *
                     * This method expects a subset of model properties as request parameters.
                     *
                     * @param {function(Object,Object)=} successCb
                     *   Success callback with two arguments: `value`, `responseHeaders`.
                     *
                     * @param {function(Object)=} errorCb Error callback with one argument:
                     *   `httpResponse`.
                     *
                     * @returns {Object} An empty reference that will be
                     *   populated with the actual data once the response is returned
                     *   from the server.
                     *
                     * <em>
                     * (The remote method definition does not provide any description.
                     * This usually means the response is a `AuthProvider` object.)
                     * </em>
                     */
                    "create": {
                        url: urlBase + "/AuthProviders",
                        method: "POST"
                    },

                    /**
                     * @ngdoc method
                     * @name lbServices.AuthProvider#createMany
                     * @methodOf lbServices.AuthProvider
                     *
                     * @description
                     *
                     * Create a new instance of the model and persist it into the data source.
                     *
                     * @param {Object=} parameters Request parameters.
                     *
                     *   This method does not accept any parameters.
                     *   Supply an empty object or omit this argument altogether.
                     *
                     * @param {Object} postData Request data.
                     *
                     * This method expects a subset of model properties as request parameters.
                     *
                     * @param {function(Array.<Object>,Object)=} successCb
                     *   Success callback with two arguments: `value`, `responseHeaders`.
                     *
                     * @param {function(Object)=} errorCb Error callback with one argument:
                     *   `httpResponse`.
                     *
                     * @returns {Array.<Object>} An empty reference that will be
                     *   populated with the actual data once the response is returned
                     *   from the server.
                     *
                     * <em>
                     * (The remote method definition does not provide any description.
                     * This usually means the response is a `AuthProvider` object.)
                     * </em>
                     */
                    "createMany": {
                        isArray: true,
                        url: urlBase + "/AuthProviders",
                        method: "POST"
                    },

                    /**
                     * @ngdoc method
                     * @name lbServices.AuthProvider#upsert
                     * @methodOf lbServices.AuthProvider
                     *
                     * @description
                     *
                     * Update an existing model instance or insert a new one into the data source.
                     *
                     * @param {Object=} parameters Request parameters.
                     *
                     *   This method does not accept any parameters.
                     *   Supply an empty object or omit this argument altogether.
                     *
                     * @param {Object} postData Request data.
                     *
                     * This method expects a subset of model properties as request parameters.
                     *
                     * @param {function(Object,Object)=} successCb
                     *   Success callback with two arguments: `value`, `responseHeaders`.
                     *
                     * @param {function(Object)=} errorCb Error callback with one argument:
                     *   `httpResponse`.
                     *
                     * @returns {Object} An empty reference that will be
                     *   populated with the actual data once the response is returned
                     *   from the server.
                     *
                     * <em>
                     * (The remote method definition does not provide any description.
                     * This usually means the response is a `AuthProvider` object.)
                     * </em>
                     */
                    "upsert": {
                        url: urlBase + "/AuthProviders",
                        method: "PUT"
                    },

                    /**
                     * @ngdoc method
                     * @name lbServices.AuthProvider#exists
                     * @methodOf lbServices.AuthProvider
                     *
                     * @description
                     *
                     * Check whether a model instance exists in the data source.
                     *
                     * @param {Object=} parameters Request parameters.
                     *
                     *  - `id` – `{*}` - Model id
                     *
                     * @param {function(Object,Object)=} successCb
                     *   Success callback with two arguments: `value`, `responseHeaders`.
                     *
                     * @param {function(Object)=} errorCb Error callback with one argument:
                     *   `httpResponse`.
                     *
                     * @returns {Object} An empty reference that will be
                     *   populated with the actual data once the response is returned
                     *   from the server.
                     *
                     * Data properties:
                     *
                     *  - `exists` – `{boolean=}` -
                     */
                    "exists": {
                        url: urlBase + "/AuthProviders/:id/exists",
                        method: "GET"
                    },

                    /**
                     * @ngdoc method
                     * @name lbServices.AuthProvider#findById
                     * @methodOf lbServices.AuthProvider
                     *
                     * @description
                     *
                     * Find a model instance by id from the data source.
                     *
                     * @param {Object=} parameters Request parameters.
                     *
                     *  - `id` – `{*}` - Model id
                     *
                     *  - `filter` – `{object=}` - Filter defining fields and include
                     *
                     * @param {function(Object,Object)=} successCb
                     *   Success callback with two arguments: `value`, `responseHeaders`.
                     *
                     * @param {function(Object)=} errorCb Error callback with one argument:
                     *   `httpResponse`.
                     *
                     * @returns {Object} An empty reference that will be
                     *   populated with the actual data once the response is returned
                     *   from the server.
                     *
                     * <em>
                     * (The remote method definition does not provide any description.
                     * This usually means the response is a `AuthProvider` object.)
                     * </em>
                     */
                    "findById": {
                        url: urlBase + "/AuthProviders/:id",
                        method: "GET"
                    },

                    /**
                     * @ngdoc method
                     * @name lbServices.AuthProvider#find
                     * @methodOf lbServices.AuthProvider
                     *
                     * @description
                     *
                     * Find all instances of the model matched by filter from the data source.
                     *
                     * @param {Object=} parameters Request parameters.
                     *
                     *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
                     *
                     * @param {function(Array.<Object>,Object)=} successCb
                     *   Success callback with two arguments: `value`, `responseHeaders`.
                     *
                     * @param {function(Object)=} errorCb Error callback with one argument:
                     *   `httpResponse`.
                     *
                     * @returns {Array.<Object>} An empty reference that will be
                     *   populated with the actual data once the response is returned
                     *   from the server.
                     *
                     * <em>
                     * (The remote method definition does not provide any description.
                     * This usually means the response is a `AuthProvider` object.)
                     * </em>
                     */
                    "find": {
                        isArray: true,
                        url: urlBase + "/AuthProviders",
                        method: "GET"
                    },

                    /**
                     * @ngdoc method
                     * @name lbServices.AuthProvider#findOne
                     * @methodOf lbServices.AuthProvider
                     *
                     * @description
                     *
                     * Find first instance of the model matched by filter from the data source.
                     *
                     * @param {Object=} parameters Request parameters.
                     *
                     *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
                     *
                     * @param {function(Object,Object)=} successCb
                     *   Success callback with two arguments: `value`, `responseHeaders`.
                     *
                     * @param {function(Object)=} errorCb Error callback with one argument:
                     *   `httpResponse`.
                     *
                     * @returns {Object} An empty reference that will be
                     *   populated with the actual data once the response is returned
                     *   from the server.
                     *
                     * <em>
                     * (The remote method definition does not provide any description.
                     * This usually means the response is a `AuthProvider` object.)
                     * </em>
                     */
                    "findOne": {
                        url: urlBase + "/AuthProviders/findOne",
                        method: "GET"
                    },

                    /**
                     * @ngdoc method
                     * @name lbServices.AuthProvider#updateAll
                     * @methodOf lbServices.AuthProvider
                     *
                     * @description
                     *
                     * Update instances of the model matched by where from the data source.
                     *
                     * @param {Object=} parameters Request parameters.
                     *
                     *  - `where` – `{object=}` - Criteria to match model instances
                     *
                     * @param {Object} postData Request data.
                     *
                     * This method expects a subset of model properties as request parameters.
                     *
                     * @param {function(Object,Object)=} successCb
                     *   Success callback with two arguments: `value`, `responseHeaders`.
                     *
                     * @param {function(Object)=} errorCb Error callback with one argument:
                     *   `httpResponse`.
                     *
                     * @returns {Object} An empty reference that will be
                     *   populated with the actual data once the response is returned
                     *   from the server.
                     *
                     * This method returns no data.
                     */
                    "updateAll": {
                        url: urlBase + "/AuthProviders/update",
                        method: "POST"
                    },

                    /**
                     * @ngdoc method
                     * @name lbServices.AuthProvider#deleteById
                     * @methodOf lbServices.AuthProvider
                     *
                     * @description
                     *
                     * Delete a model instance by id from the data source.
                     *
                     * @param {Object=} parameters Request parameters.
                     *
                     *  - `id` – `{*}` - Model id
                     *
                     * @param {function(Object,Object)=} successCb
                     *   Success callback with two arguments: `value`, `responseHeaders`.
                     *
                     * @param {function(Object)=} errorCb Error callback with one argument:
                     *   `httpResponse`.
                     *
                     * @returns {Object} An empty reference that will be
                     *   populated with the actual data once the response is returned
                     *   from the server.
                     *
                     * This method returns no data.
                     */
                    "deleteById": {
                        url: urlBase + "/AuthProviders/:id",
                        method: "DELETE"
                    },

                    /**
                     * @ngdoc method
                     * @name lbServices.AuthProvider#count
                     * @methodOf lbServices.AuthProvider
                     *
                     * @description
                     *
                     * Count instances of the model matched by where from the data source.
                     *
                     * @param {Object=} parameters Request parameters.
                     *
                     *  - `where` – `{object=}` - Criteria to match model instances
                     *
                     * @param {function(Object,Object)=} successCb
                     *   Success callback with two arguments: `value`, `responseHeaders`.
                     *
                     * @param {function(Object)=} errorCb Error callback with one argument:
                     *   `httpResponse`.
                     *
                     * @returns {Object} An empty reference that will be
                     *   populated with the actual data once the response is returned
                     *   from the server.
                     *
                     * Data properties:
                     *
                     *  - `count` – `{number=}` -
                     */
                    "count": {
                        url: urlBase + "/AuthProviders/count",
                        method: "GET"
                    },

                    /**
                     * @ngdoc method
                     * @name lbServices.AuthProvider#prototype$updateAttributes
                     * @methodOf lbServices.AuthProvider
                     *
                     * @description
                     *
                     * Update attributes for a model instance and persist it into the data source.
                     *
                     * @param {Object=} parameters Request parameters.
                     *
                     *  - `id` – `{*}` - PersistedModel id
                     *
                     * @param {Object} postData Request data.
                     *
                     * This method expects a subset of model properties as request parameters.
                     *
                     * @param {function(Object,Object)=} successCb
                     *   Success callback with two arguments: `value`, `responseHeaders`.
                     *
                     * @param {function(Object)=} errorCb Error callback with one argument:
                     *   `httpResponse`.
                     *
                     * @returns {Object} An empty reference that will be
                     *   populated with the actual data once the response is returned
                     *   from the server.
                     *
                     * <em>
                     * (The remote method definition does not provide any description.
                     * This usually means the response is a `AuthProvider` object.)
                     * </em>
                     */
                    "prototype$updateAttributes": {
                        url: urlBase + "/AuthProviders/:id",
                        method: "PUT"
                    },

                    /**
                     * @ngdoc method
                     * @name lbServices.AuthProvider#createChangeStream
                     * @methodOf lbServices.AuthProvider
                     *
                     * @description
                     *
                     * Create a change stream.
                     *
                     * @param {Object=} parameters Request parameters.
                     *
                     *   This method does not accept any parameters.
                     *   Supply an empty object or omit this argument altogether.
                     *
                     * @param {Object} postData Request data.
                     *
                     *  - `options` – `{object=}` -
                     *
                     * @param {function(Object,Object)=} successCb
                     *   Success callback with two arguments: `value`, `responseHeaders`.
                     *
                     * @param {function(Object)=} errorCb Error callback with one argument:
                     *   `httpResponse`.
                     *
                     * @returns {Object} An empty reference that will be
                     *   populated with the actual data once the response is returned
                     *   from the server.
                     *
                     * Data properties:
                     *
                     *  - `changes` – `{ReadableStream=}` -
                     */
                    "createChangeStream": {
                        url: urlBase + "/AuthProviders/change-stream",
                        method: "POST"
                    },
                }
            );



            /**
             * @ngdoc method
             * @name lbServices.AuthProvider#updateOrCreate
             * @methodOf lbServices.AuthProvider
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `AuthProvider` object.)
             * </em>
             */
            R["updateOrCreate"] = R["upsert"];

            /**
             * @ngdoc method
             * @name lbServices.AuthProvider#update
             * @methodOf lbServices.AuthProvider
             *
             * @description
             *
             * Update instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            R["update"] = R["updateAll"];

            /**
             * @ngdoc method
             * @name lbServices.AuthProvider#destroyById
             * @methodOf lbServices.AuthProvider
             *
             * @description
             *
             * Delete a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            R["destroyById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.AuthProvider#removeById
             * @methodOf lbServices.AuthProvider
             *
             * @description
             *
             * Delete a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            R["removeById"] = R["deleteById"];


            /**
             * @ngdoc property
             * @name lbServices.AuthProvider#modelName
             * @propertyOf lbServices.AuthProvider
             * @description
             * The name of the model represented by this $resource,
             * i.e. `AuthProvider`.
             */
            R.modelName = "AuthProvider";


            return R;
        }]);


})(window,window.angular);