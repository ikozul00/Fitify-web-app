const contentful = require("contentful-management");

const client = contentful.createClient({
  accessToken: process.env.CONTENT_MANAGEMENT_API_KEY,
});

export const deleteAsset = async (assetId) => {
    let asset = await client
      .getSpace(process.env.CONTENTFUL_SPACE_ID)
      .then((space) => space.getEnvironment("master"))
      .then((environment) => environment.getAsset(assetId));
      console.log("asset");
      console.log(asset);
      if(asset){
        let done= await asset.unpublish();
        done= await asset.delete();
        return 0;
      }
      else{
          return-1;
      }
  };