from flask import *
from flask_login import LoginManager, UserMixin, login_user, current_user, login_required, logout_user, login_required
from pymongo import MongoClient

app = Flask(__name__)
app.secret_key = "IotaToTheMoon"

login_manager = LoginManager(app)

client = MongoClient('mongodb://ds261277.mlab.com:61277', username='iotaUser', password='i0tapa', authSource='heroku_p952xp63')

db = client['heroku_p952xp63']
users = db['users']

@login_manager.user_loader  
def user_loader(id):
    man = users.find_one({ "account" : id })

    if man == None:  
        return  
  
    user = User()  
    user.id = id  
    return user  

class User(UserMixin):    
    pass  

@app.route("/", methods=['GET', 'POST'])
def index():
    return "<h1>It's Works</h1>"

@app.route("/test")
def test(account = ""):

    if current_user.is_authenticated:
        return render_template("test.html", account=current_user.id)

    return render_template('test.html')

@app.route("/login", methods=['GET','POST'])
def login():
    if request.method == 'POST':
        status = login_check(request.form['account'], request.form['password'])

        # print("status", status)

        if status == 1:
            user = User()

            user.id = request.form['account']

            login_user(user)

            return redirect(url_for('test'))

        else:
            return render_template('login.html', message="bad login")
        
    return render_template('login.html')

def login_check(ac, pa):
    man = users.find_one({"account" : ac})

    if man == None:
        return 0

    if man['password'] == pa:
        return 1
    else:
        return -1

@app.route("/logout")
def logout():
    logout_user()

    return redirect(url_for("test"))

if __name__ == '__main__':
    app.debug = True
    app.run()
