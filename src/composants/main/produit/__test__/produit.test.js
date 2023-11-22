import Produits from "../produit";
import produitCtrl from "../../../../../../controllers/produit";
import Produit from "../../../../../../models/produit";

beforeEach(() => {
   jest.spyOn(window, "fetch").mockImplementation(produitCtrl);
})

afterEach(() => {
   jest.restoreAllMocks()
});



/* Teste simulé d'affichade de produit */
it("affiche les données d'un produit", async () => {
  const fakeProduit = {
    id_Produit: 'P01',
    libelle: 'Assus Zenbook',
    prix: '125000',
    description: 'Assus Zenbook',
    contenu: 'Assus Zenbook',
    images: 'assus.com',
    category: 'ordinateur',
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeProduit)
    })
  );

});

/* Teste simulé d'ajout de produit */
async function ajoutProduit() {
  const product = new product({
    id_Produit: 'P01',
    libelle: 'Assus Zenbook',
    prix: '125000',
    description: 'Assus Zenbook',
    contenu: 'Assus Zenbook',
    images: 'assus.com',
    category: 'ordinateur',
  })
  return await Produit.create(product)
}
