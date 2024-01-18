"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

import style from "@/style/recipeCreate.module.css"
import RecipeTitle from "./_components/recipe-title";
import RecipeTitleImg from "./_components/recipe-title-img";
import toast from "react-hot-toast";

const ReciptCreate = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user.id) {
      toast.error("로그인 후 이용하실 수 있습니다.");
      return redirect("/");
    };
  },[session])

  return ( 
    <div className={style.container}>
      <RecipeTitle />
      <RecipeTitleImg />
    </div>
  );
}
 
export default ReciptCreate;