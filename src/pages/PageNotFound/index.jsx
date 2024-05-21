import { useNavigate } from "react-router-dom"
import styles from "./index.module.css"
function PageNotFound() {
    const navigate = useNavigate();
    function handleClick() {
        navigate(`/`)
    }
  return (
    <div className={styles.appWrapper}>
        <div className={styles.app}>
		<div className={styles.error}>404</div>
		<div className={styles.txt}>
			Not Found<span className={styles.blink}>_</span>
		</div>

        <button onClick={handleClick} className={styles.backBtn}>Go Back</button>
	</div>
    </div>
    
  )
}

export default PageNotFound