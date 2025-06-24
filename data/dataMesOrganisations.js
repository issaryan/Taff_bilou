const mockOrganizations = Array.from({ length: 50 }).map((_, index) => ({
  id: index + 1,
  name: `Organisation ${index + 1}`,
  description: `Ceci est une description de l'organisation numéro ${index + 1}.`,
  logo: `https://via.placeholder.com/50x50.png?text=O${index + 1}`,
}));
export default mockOrganizations;