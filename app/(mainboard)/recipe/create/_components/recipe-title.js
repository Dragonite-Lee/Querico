import style from "@/style/recipeCreate.module.css"

const RecipeTitle = () => {
  return (
    <div className={style.titleContainer}>
      <textarea 
        placeholder="제목을 적어주세요" 
        className={style.titleInput}
      />
    </div>
  );
}
 
export default RecipeTitle;