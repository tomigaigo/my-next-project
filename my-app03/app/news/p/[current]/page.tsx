
import { notFound } from "next/navigation";
import { getNewsList } from "@/app/_libs/microcms";
import NewsList from "@/app/_components/NewsList";
import Pagination from "@/app/_components/Pagination";
import { NEWS_LIST_LIMIT } from "@/app/_constants";

type Props = {
  params: {
    current: string; // 追 加
  };
};

export default async function Page({ params }: Props) {
    const current = parseInt(params.current, 10);
    // const { contents: news } = await getNewsList();

    if (Number.isNaN(current) || current < 1) {
      notFound();
    }

    const { contents: news, totalCount } = await getNewsList({	 // 追 加
        limit: NEWS_LIST_LIMIT,
        offset: NEWS_LIST_LIMIT * (current - 1),
    });

    if (news.length === 0) {	// 追加
    notFound();
    }

    // return <NewsList news={news} />;
    return (
        <>
          <NewsList news={news} />
          <Pagination totalCount={totalCount}  current={current} />
        </>
    );

}
// offset クエリパラメータ
// 10 × (今いるページ番号 - 1)　 今いるという言い方をするとわかりにくい、
// 10 × (表示するページ番号 - 1)　表示するページとすると分かりやすい。

// 例 ３ページ目を指定（offset:20　にしたい)
// 10 × (3 - 1) = 20
