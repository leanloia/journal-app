import { fileUpload } from "../../helpers/fileUpload";
import cloudinary from "cloudinary";
import {} from "@testing-library/jest-dom";

cloudinary.config({
  cloud_name: "dhwbrqilm",
  api_key: "464552153875769",
  api_secret: "xbCpj78yxUCDKZQByQ0jgbLvNcQ",
});

describe("Pruebas en fileUpload helper", () => {
  // test("debe de cargar un fichero y retornar el url", async () => {
  //   const resp = await fetch(
  //     "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"
  //   );

  //   const blob = await resp.blob();

  //   const file = new File([blob], "foto.png");
  //   const url = await fileUpload(file);

  //   expect(typeof url).toBe("string");

  //   const segments = url.split("/");
  //   const imageId = segments[segments.length - 1].replace(".png", "");
  //   console.log(imageId);
  //   await cloudinary.v2.api.delete_resources([imageId], {}, () => {});


  // });

  //   test("debe de retornar un error", async () => {
  //     const file = new File([], "foto.png");
  //     const url = await fileUpload(file);

  //     expect(url).toBe(null);
  //   });

  test('algo', () => {
    
  })
  
});
