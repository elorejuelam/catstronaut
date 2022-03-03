const fetch = require('node-fetch');

const resolvers = {
    Query: {
      // get all tracks, will be used to populate 
      // the homepage grid of our web client
      tracksForHome: (_, __, {dataSources}) => {
        return dataSources.trackAPI.getTracksForHome();
      },
      // get a single track by ID, for the track page
      track: (_, {id}, {dataSources}) => {
          return dataSources.trackAPI.getTrack(id);
      },
    },

    Mutation: {
      // increments a track's numberOfViews property
      incrementTrackViews: async (_, { id }, {dataSources}) => {
        const track = await dataSources.trackAPI.incrementTrackViews(id);
        return {
          code: 200,
          success: true,
          mesage: `Successfully incremented number of views for track ${id}`,
          track
        };
      },
    },

    Track: {
      author: ({authorId}, _, {dataSources}) => {
        return dataSources.trackAPI.getAuthor(authorId);
      },
      modules: ({id}, _, {dataSources}) => {
        return dataSources.trackAPI.getTrackModules(id);
      },     
    },
};

module.exports = resolvers;