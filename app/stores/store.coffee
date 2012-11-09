App.Store = DS.Store.extend
  revision: 7
  adapter: DS.FixtureAdapter.create
    simulateRemoteResponse: false
    serializer: DS.RESTSerializer