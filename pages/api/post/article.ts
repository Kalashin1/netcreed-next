import { getArticle, getArticleBySlug } from "../../../helper";


export default async function handler(req: any, res: any) {
  const { id, slug } = req.query;
  console.log(id)
  if (slug) {
    console.log("slug ran")
    const { article } = await getArticleBySlug(slug);
    if (article) {
      res.status(200).json({ article })
    } 
  }
  console.log("slug did not run");
  const { article } = await getArticle(id);
  if (article) {
    res.status(200).json({ article })
  } else {
    res.status(404).json({ error: 'no article found!' })
  }

}