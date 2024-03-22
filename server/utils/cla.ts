export async function hasAcceptedCla(author: string) {
    const clas = await useStorage("cla").getItem<string[]>("cla.json");
    if (!clas) {
        await useStorage("cla").setItem("cla.json", []);
        return false;
    }
    return clas.includes(author);
}
