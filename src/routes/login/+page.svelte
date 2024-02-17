<script>
    import { enhance } from '$app/forms';
    export let form;
</script>

<div class="row">
    <div class="col-2">
        <h1>Connexion</h1>
        <form method="post" use:enhance>
            <div class="form-group">
                <label for="exampleInputEmail1">Adresse e-mail</label>
                <input type="email" class="form-control" id="email" name="email" placeholder="Entrez votre e-mail">
                {#if form?.email}<p class="error">{form?.email}</p>{/if}
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Mot de passe</label>
                <input type="password" class="form-control" id="password" name="password" placeholder="Entrez votre mot de passe">
                {#if form?.password}<p class="error">{form?.password}</p>{/if}
            </div>
            <div class="form-check">
                <input type="checkbox" class="form-check-input" id="stayconnected" name="stayconnected">
                <label class="form-check-label" for="stayconnected">Rester connecté</label>
            </div>
            <button type="submit" class="btn btn-primary mt-4">Se connecter</button>
        </form>
    </div>
</div>

<style>
.col-2 {
    margin: 100px auto;
}
</style>